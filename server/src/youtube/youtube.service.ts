import { Injectable, NotFoundException } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { GameTrailers } from './models/trailers.schema';
import { GameReviews } from './models/reviews.schema';
import { SearchResultDto } from './dto/search-result.dto';
import { GamesService } from 'src/games/games.service';
import { YoutubeRepository } from './youtube.repository';

@Injectable()
export class YoutubeService {
  private readonly youtube = google.youtube('v3');

  constructor(
    private readonly gamesService: GamesService,
    private readonly youtubeRepository: YoutubeRepository,
  ) {}

  async getGameVideoReviewByGameId(
    id: number,
    lang?: 'pl' | 'en',
  ): Promise<GameReviews> {
    const game = await this.gamesService.getGameById(id);

    if (game.rawgGame.released === null) {
      throw new NotFoundException('Game not released yet');
    }

    const searchQuery = `${game.rawgGame.name} ${
      lang === 'pl' ? 'recenzja' : 'review'
    }`;

    const game_reviews = await this.getOrFetchGameVideos(
      game._id,
      game.rawgGame.name,
      searchQuery,
      'reviews',
    );

    const result: GameReviews = {
      game_id: game._id,
      video_reviews: game_reviews,
    };

    return result;
  }

  async getGameTrailersByGameId(id: number): Promise<GameTrailers> {
    const game = await this.gamesService.getGameById(id);
    const searchQuery = `${game.rawgGame.name} Official trailer`;

    const game_trailers = await this.getOrFetchGameVideos(
      game._id,
      game.rawgGame.name,
      searchQuery,
      'trailers',
    );

    const result: GameTrailers = {
      game_id: game._id,
      video_trailers: game_trailers,
    };

    return result;
  }

  private async getOrFetchGameVideos(
    gameId: number,
    gameTitle: string,
    searchQuery: string,
    videoType: 'reviews' | 'trailers',
  ): Promise<SearchResultDto[]> {
    const existingVideos = await this.youtubeRepository.getGameVideos(
      gameId,
      videoType,
    );
    if (existingVideos.length > 0) {
      return existingVideos;
    }

    const newVideos = (await this.youtubeSearch(searchQuery)).filter((video) =>
      video.title?.toLowerCase().includes(gameTitle.toLowerCase()),
    );

    if (videoType === 'reviews') {
      await this.youtubeRepository.saveGameVideoReviews(gameId, newVideos);
    } else {
      await this.youtubeRepository.saveGameTrailers(gameId, newVideos);
    }

    return newVideos;
  }

  private async youtubeSearch(q: string): Promise<SearchResultDto[]> {
    const requestOptions: youtube_v3.Params$Resource$Search$List = {
      key: process.env.YOUTUBE_API_KEY,
      q: q,
      part: ['snippet'],
      type: ['video'],
      order: 'relevance',
      maxResults: 5,
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
