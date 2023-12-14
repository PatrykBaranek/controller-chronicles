import { Injectable, Logger } from '@nestjs/common';
import { ConfigService }      from '@nestjs/config';
import { google, youtube_v3 } from 'googleapis';
import { differenceInDays }   from 'date-fns';
import { plainToInstance } from 'class-transformer';

import { SearchResultDto }         from '../dto/search-result.dto';
import { GamesService }            from 'src/games/services/games.service';
import { GamesRepository }         from 'src/games/database/games.repository';
import { GetGameVideoReviewDto }   from '../dto/get-game-video-review.dto';
import { GetVideosByDateRangeDto } from '../dto/get-videos-by-date-range.dto';

import { VideoType, YoutubeUtilityService } from '../util/youtube-utility.service';
import { Game, GameDocument } from 'src/games/models/game.schema';
import { YoutubeVideo } from '../models/youtube-video.schema';
import { DeleteVideoDto } from '../dto/delete-video.dto';

const DAY_DIFFERENCE_THRESHOLD = 7;

const MAX_RESULTS = 5;

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name);

  private readonly youtube = google.youtube('v3');

  constructor(
    private readonly configService: ConfigService,
    private readonly gamesService: GamesService,
    private readonly gamesRepository: GamesRepository,
    private readonly youtubeUtilityService: YoutubeUtilityService,
  ) {}

  async getGameVideosByGameId(getGameVideoReviewDto: GetGameVideoReviewDto): Promise<SearchResultDto[]> {
    const { gameId, videoType } = getGameVideoReviewDto;

    const videos = await this.getOrFetchGameVideos(gameId, videoType);

    return videos;
  }

  async getVideosByDateRange(getVideosByDateRangeDto: GetVideosByDateRangeDto): Promise<SearchResultDto[]> {
    const { fromDate, toDate, videoType, gamesCount } = getVideosByDateRangeDto;

    const dateQuery = `${fromDate},${toDate}`;

    const games = await this.gamesService.getGames({ page: 1, page_size: gamesCount, dates: dateQuery });

    const videos = await Promise.all(games.results.map(async (game) => {
      return await this.getOrFetchGameVideos(game.id, videoType);
    }));

    return videos.flat();
  }

  async deleteVideo(deleteVideoDto: DeleteVideoDto) {
    const { gameId, videoId, videoType } = deleteVideoDto;

    const gameInDb = await this.gamesRepository.findGame(gameId);

    if (!gameInDb) {
      throw new Error(`Game with id ${gameId} not found`);
    }

    if (videoType === VideoType.REVIEW) {
      const videoReviews = gameInDb.video_reviews.filter(video => !video.link.includes(videoId));
      await this.gamesRepository.updateGame(gameId, { video_reviews: videoReviews });
    }

    if (videoType === VideoType.TRAILER) {
      const gameTrailers = gameInDb.game_trailers.filter(video => !video.link.includes(videoId));
      await this.gamesRepository.updateGame(gameId, { game_trailers: gameTrailers });
    }
  }

  private async getOrFetchGameVideos(gameId: number, videoType: VideoType, apiParams?: youtube_v3.Params$Resource$Search$List): Promise<SearchResultDto[]> {
    const gameInDb = await this.youtubeUtilityService.fetchGame(gameId, videoType);
    const videoFieldName = this.youtubeUtilityService.getVideoFieldName(videoType);

    const cachedVideos = this.getCachedVideosIfValid(gameInDb, videoFieldName);
    if (cachedVideos) {
      return cachedVideos;
    }

    return this.fetchAndUpdateGameVideos(gameInDb, videoFieldName, videoType, apiParams);
  }

  private getCachedVideosIfValid(gameInDb: Game, videoFieldName: keyof GameDocument): SearchResultDto[] | null {
    const dayDifference = differenceInDays(new Date(), gameInDb.updatedAt);
    const isCacheValid = gameInDb[videoFieldName]?.length > 0 && dayDifference <= DAY_DIFFERENCE_THRESHOLD;

    if (isCacheValid) {
      this.logger.log(`Using cached ${videoFieldName} for game ${gameInDb.rawgGame.name}`);
      return gameInDb[videoFieldName];
    }

    return null;
  }

  private async fetchAndUpdateGameVideos(gameInDb: Game, videoFieldName: keyof GameDocument, videoType: VideoType, apiParams?: youtube_v3.Params$Resource$Search$List): Promise<SearchResultDto[]> {
    try {
      this.logger.log(`Fetching ${videoType} for game ${gameInDb.rawgGame.name}`);
      const searchQuery = this.youtubeUtilityService.constructQuery(gameInDb.rawgGame.name, videoType);
      const videos = await this.youtubeSearch(gameInDb._id, searchQuery, apiParams);
      let filteredVideos = this.youtubeUtilityService.filterResults(videos, videoType);

      filteredVideos = this.mergeWithExistingVideos(filteredVideos, gameInDb[videoFieldName]);
      await this.saveGameVideos(gameInDb._id, filteredVideos, videoFieldName);

      return filteredVideos;
    } catch (err) {
      this.logger.error(`Error fetching ${videoType} for game ${gameInDb.rawgGame.name}: ${err}`);
      return gameInDb[videoFieldName] ?? [];
    }
  }

  private mergeWithExistingVideos(newVideos: SearchResultDto[], existingVideos?: SearchResultDto[]): SearchResultDto[] {
    if (!existingVideos) {
      return newVideos;
    }

    const existingVideoLinks = new Set(existingVideos.map(video => video.link));
    const uniqueNewVideos = newVideos.filter(video => !existingVideoLinks.has(video.link));

    return [...existingVideos, ...uniqueNewVideos];
  }

  private async saveGameVideos(gameId: number, videos: SearchResultDto[], videoFieldName: keyof GameDocument): Promise<void> {
    const youtubeVideos = videos.map(videoDto => plainToInstance(YoutubeVideo, videoDto));

    await this.gamesRepository.updateGame(gameId, { [videoFieldName]: youtubeVideos });
  }

  private async youtubeSearch(gameId: number, query: string, apiParams?: youtube_v3.Params$Resource$Search$List): Promise<SearchResultDto[]> {
    try {
      const requestOptions: youtube_v3.Params$Resource$Search$List = {
        key: this.configService.get<string>('YOUTUBE_API_KEY'),
        q: query,
        part: ['snippet'],
        type: ['video'],
        order: 'relevance',
        videoEmbeddable: 'true',
        maxResults: MAX_RESULTS,
        ...apiParams,
      };

      const response = await this.youtube.search.list(requestOptions);
      return response.data.items.map((item) => ({
        game_id: gameId,
        title: item.snippet?.title,
        thumbnail: item.snippet?.thumbnails?.high?.url,
        author: item.snippet?.channelTitle,
        link: `https://www.youtube.com/embed/${item.id?.videoId}`,
      }));
    } catch (err) {
      this.logger.error(`Error fetching videos from Youtube: ${err} for query ${query}`);
      return [];
    }
  }
}
