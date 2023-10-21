import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { SearchResultDto } from '../dto/search-result.dto';
import { GamesService } from 'src/games/services/games.service';
import { YoutubeRepository } from '../database/youtube.repository';
import { format } from 'date-fns';

export enum VideoType {
  REVIEW  = 'review',
  TRAILER = 'trailer',
}

const REVIEW_CHANNEL_IDS = {
  IGN:              'UCKy1dAqELo0zrOtPkf0eTMw',
  GAMESPOT:         'UCbu2SsF-Or3Rsn3NxqODImw',
  DIGITAL_FOUNDARY: 'UC9PBzalIcEQCsiIkq36PyUA',
  GAME_INFORMER:    'UCK-65DO2oOxxMwphl2tYtcw',
  GAMES_RADAR:      'UCk2ipH2l8RvLG0dr-rsBiZw',
};

@Injectable()
export class YoutubeService {
  private readonly youtube = google.youtube('v3');

  constructor(
    private readonly gamesService: GamesService,
    private readonly youtubeRepository: YoutubeRepository,
  ) {}

  async getGameVideoReviewByGameIdByAllChannels(id: number): Promise<SearchResultDto[]> {
    const game = await this.fetchGame(id);
    const query = this.constructQuery(game.rawgGame.name, VideoType.REVIEW, 'en');

    const allChannelIds = Object.values(REVIEW_CHANNEL_IDS);
    const videos = await Promise.all(allChannelIds.map(channelId =>
        this.getOrFetchGameVideos(id, query, VideoType.REVIEW, { channelId })
    ));

    return videos.flat();
  }

  async getGameVideosByGameId(id: number, videoType: VideoType): Promise<SearchResultDto[]> {
    const game = await this.fetchGame(id, videoType);
    const query = this.constructQuery(game.rawgGame.name, videoType);
    const videos = await this.getOrFetchGameVideos(id, query, videoType);
    return videos;
  }

  async getVideosByDateRange(fromDate: string, toDate: string, videoType: VideoType, reviewChannels: boolean) {
    const formattedFromDate = format(new Date(fromDate), 'yyyy-MM-dd');
    const formattedToDate = format(new Date(toDate), 'yyyy-MM-dd');
  
    const dateQuery = `${formattedFromDate},${formattedToDate}`;
  
    const games = await this.gamesService.getGames({ page: 1, page_size: 5, dates: dateQuery });
    const gameIds = games.results.map((game) => game.id);

    const videos = await Promise.all(gameIds.map(async (gameId) => {
      const game = await this.fetchGame(gameId);
      const query = this.constructQuery(game.rawgGame.name, videoType);

      if (reviewChannels) {
        return this.getGameVideoReviewByGameIdByAllChannels(gameId);
      } else {
        return await this.getOrFetchGameVideos(gameId, query, videoType);
      }
    }));

    return videos.flat();
  }

  private constructQuery(gameName: string, videoType: VideoType, lang: 'pl' | 'en' = 'en'): string {
    if (videoType === VideoType.REVIEW) {
      return `${gameName} ${lang === 'pl' ? 'recenzja' : 'review'}`;
    }
    return `${gameName} Official Trailer`;
  }

  private async fetchGame(id: number, videoType?: VideoType) {
    const game = await this.gamesService.getGameById(id);
    if (videoType === VideoType.REVIEW && !game.rawgGame.released) {
      throw new NotFoundException('Game not released yet');
    }
    return game;
  }

  private async getOrFetchGameVideos(gameId: number, searchQuery: string, videoType: VideoType, apiParams?: youtube_v3.Params$Resource$Search$List
  ): Promise<SearchResultDto[]> {
    const existingGame = await this.gamesService.getGameById(gameId);
    if (existingGame.video_reviews?.length > 0) {
      return existingGame.video_reviews;
    }

    try {
      const videos = await this.youtubeSearch(searchQuery, apiParams);
      if (videoType === VideoType.REVIEW) {
        await this.youtubeRepository.saveGameVideoReviews(gameId, videos);
      } else {
        await this.youtubeRepository.saveGameTrailers(gameId, videos);
      }
      return videos;
    } catch (err) {

      if (videoType === VideoType.REVIEW) {
        return existingGame?.video_reviews;
      } else {
        return existingGame?.game_trailers;
      }
    }
  }

  private async youtubeSearch(query: string, apiParams?: youtube_v3.Params$Resource$Search$List): Promise<SearchResultDto[]> {
    const requestOptions: youtube_v3.Params$Resource$Search$List = {
      key: process.env.YOUTUBE_API_KEY,
      q: query,
      part: ['snippet'],
      type: ['video'],
      order: 'relevance',
      maxResults: 5,
      ...apiParams,
    };

    const response = await this.youtube.search.list(requestOptions);
    return response.data.items.map((item) => ({
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.high?.url,
      author: item.snippet?.channelTitle,
      link: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
    }));
  }
}
