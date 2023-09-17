import { Injectable, NotFoundException } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { SearchResultDto } from '../dto/search-result.dto';
import { GamesService } from 'src/games/services/games.service';
import { YoutubeRepository } from '../youtube.repository';

enum VideoType {
  REVIEWS = 'reviews',
  TRAILERS = 'trailers',
}

@Injectable()
export class YoutubeService {
  private readonly youtube = google.youtube('v3');

  constructor(
    private readonly gamesService: GamesService,
    private readonly youtubeRepository: YoutubeRepository,
  ) { }

  async getGameVideoReviewByGameId(id: number, lang?: 'pl' | 'en'): Promise<SearchResultDto[]> {
    const game = await this.fetchGame(id);
    const query = this.constructQuery(game.rawgGame.name, VideoType.REVIEWS, lang);
    const videos = await this.getOrFetchGameVideos(id, query, VideoType.REVIEWS);
    return videos;
  }

  async getGameTrailersByGameId(id: number): Promise<SearchResultDto[]> {
    const game = await this.fetchGame(id);
    const query = this.constructQuery(game.rawgGame.name, VideoType.TRAILERS);
    const videos = await this.getOrFetchGameVideos(id, query, VideoType.TRAILERS);
    return videos;
  }

  private constructQuery(gameName: string, videoType: VideoType, lang?: 'pl' | 'en'): string {
    if (videoType === VideoType.REVIEWS){
      return `${gameName} ${lang === 'pl' ? 'recenzja' : 'review'}`;
    }
    return `${gameName} Official Trailer`;
  }

  private async fetchGame(id: number) {
    const game = await this.gamesService.getGameById(id);
    if (!game.rawgGame.released) {
      throw new NotFoundException('Game not released yet');
    }
    return game;
  }

  private async getOrFetchGameVideos(gameId: number, searchQuery: string, videoType: VideoType): Promise<SearchResultDto[]> {
    const existingVideos = await this.youtubeRepository.getGameVideos(gameId, videoType);
    if (existingVideos.length > 0) {
      return existingVideos;
    }

    const newVideos = await this.youtubeSearch(searchQuery);

    if (videoType === VideoType.REVIEWS) {
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
