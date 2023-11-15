import { Injectable, Logger } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { differenceInDays }   from 'date-fns';

import { SearchResultDto }         from '../dto/search-result.dto';
import { GamesService }            from 'src/games/services/games.service';
import { GamesRepository }         from 'src/games/database/games.repository';
import { GetGameVideoReviewDto }   from '../dto/get-game-video-review.dto';
import { GetVideosByDateRangeDto } from '../dto/get-videos-by-date-range.dto';

import { VideoType, REVIEW_CHANNEL_IDS, YoutubeUtilityService } from '../util/youtube-utility.service';

const DAY_DIFFERENCE_THRESHOLD = 7;

const MAX_RESULTS = 5;

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name);

  private readonly youtube = google.youtube('v3');

  constructor(
    private readonly gamesService:          GamesService,
    private readonly gamesRepository:       GamesRepository,
    private readonly youtubeUtilityService: YoutubeUtilityService,
  ) {}

  async getGameVideosByGameId(getGameVideoReviewDto: GetGameVideoReviewDto): Promise<SearchResultDto[]> {
    const { gameId, videoType } = getGameVideoReviewDto;
    const videos = await this.getOrFetchGameVideos(gameId, videoType);
    return videos;
  }

  async getVideosByDateRange(getVideosByDateRangeDto: GetVideosByDateRangeDto): Promise<SearchResultDto[]> {
    const { fromDate, toDate, videoType, reviewChannels } = getVideosByDateRangeDto;

    const dateQuery = `${fromDate},${toDate}`;

    const games = await this.gamesService.getGames({ page: 1, page_size: 5, dates: dateQuery });

    const videos = await Promise.all(games.results.map(async (game) => {
      if (reviewChannels && videoType === VideoType.REVIEW) {
        return await this.getGameVideoReviewByGameIdByAllChannels(game.id);
      } else {
        return await this.getOrFetchGameVideos(game.id, videoType);
      }
    }));

    return videos.flat();
  }

  private async getGameVideoReviewByGameIdByAllChannels(id: number): Promise<SearchResultDto[]> {
    const allChannelIds = Object.values(REVIEW_CHANNEL_IDS);
    const videos = await Promise.all(allChannelIds.map(channelId =>
      this.getOrFetchGameVideos(id, VideoType.REVIEW, { channelId })
    ));

    return videos.flat();
  }

  private async getOrFetchGameVideos(gameId: number, videoType: VideoType, apiParams?: youtube_v3.Params$Resource$Search$List): Promise<SearchResultDto[]> {
    const gameInDb       = await this.youtubeUtilityService.fetchGame(gameId, videoType);
    const searchQuery    = this.youtubeUtilityService.constructQuery(gameInDb.rawgGame.name, videoType);
    const videoFieldName = this.youtubeUtilityService.getVideoFieldName(videoType);

    const dayDifference = differenceInDays(new Date(), gameInDb.updatedAt);

    if (gameInDb[videoFieldName] && dayDifference <= DAY_DIFFERENCE_THRESHOLD) {
      return gameInDb[videoFieldName];
    }

    try {
      this.logger.log(`Fetching ${videoType} for game ${gameInDb.rawgGame.name}`);
      const videos       = await this.youtubeSearch(gameId, searchQuery, apiParams);
      let filteredVideos = this.youtubeUtilityService.filterResults(gameInDb.rawgGame.name, videos);

      if (gameInDb[videoFieldName] != null) {
        const existingVideoLinks = new Set(gameInDb[videoFieldName].map(video => video.link));

        filteredVideos = videos.filter(video => !existingVideoLinks.has(video.link));

        filteredVideos = [...gameInDb[videoFieldName], ...filteredVideos];
      }

      await this.gamesRepository.updateGame(gameId, { [videoFieldName]: filteredVideos });

      return filteredVideos.map(video => ({ ...video, gameId }));
    } catch (err) {
      this.logger.error(`Error fetching ${videoType} for game ${gameInDb.rawgGame.name}: ${err}`);
      return gameInDb[videoFieldName] ?? [];
    }

  }

  private async youtubeSearch(gameId: number, query: string, apiParams?: youtube_v3.Params$Resource$Search$List): Promise<SearchResultDto[]> {
    try {
      const requestOptions: youtube_v3.Params$Resource$Search$List = {
        key: process.env.YOUTUBE_API_KEY,
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
        title: item.snippet?.title,
        thumbnail: item.snippet?.thumbnails?.high?.url,
        author: item.snippet?.channelTitle,
        link: `https://www.youtube.com/embed/${item.id?.videoId}`,
        gameId
      }));
    } catch (err) {
      this.logger.error(`Error fetching videos from Youtube: ${err} for query ${query}`);
      return [];
    }
  }
}
