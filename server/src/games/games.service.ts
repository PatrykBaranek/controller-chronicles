import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { RawgGameResponse } from './types/rawg-game-response';
import { google, youtube_v3 } from 'googleapis';
import { GetGameDto } from './dto/get-game.dto';

@Injectable()
export class GamesService {
  private readonly youtube = google.youtube('v3');

  constructor(private readonly httpService: HttpService) {}

  getGames(
    options?: GetGameDto,
  ): Observable<AxiosResponse<RawgGameResponse[]>> {
    const { page, page_size, stores, metacritic, ordering, search } = options;

    const paramsObject: Record<string, string> = {
      key: process.env.RAWG_API_KEY,
      ...(page && { page: page.toString() }),
      ...(page_size && { page_size: page_size.toString() }),
      ...(stores && { stores }),
      ...(metacritic && { metacritic: metacritic.toString() }),
      ...(ordering && { ordering: ordering.join(',') }),
      ...(search && { search }),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `https://api.rawg.io/api/games?${httpParams.toString()}`;

    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  getGameById(id: number): Observable<RawgGameResponse> {
    return this.httpService
      .get<RawgGameResponse>(
        'https://api.rawg.io/api/games/' +
          id +
          '?key=' +
          process.env.RAWG_API_KEY,
      )
      .pipe(map((response: AxiosResponse<RawgGameResponse>) => response.data));
  }

  getGameTrailersById(id: number) {
    return this.httpService
      .get(
        `https://api.rawg.io/api/games/${id}/movies?key=${process.env.RAWG_API_KEY}`,
      )
      .pipe(map((response) => response.data));
  }

  getGamesByDeveloper() {
    return this.httpService
      .get(`https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`)
      .pipe(map((response) => response.data));
  }

  async getGameVideoReviewByTitle(
    title: string,
    lang?: 'pl' | 'en',
  ): Promise<any> {
    let searchQuery = `${title} `;

    if (lang === 'pl') {
      searchQuery += 'recenzja';
    } else {
      searchQuery += 'review';
    }

    const requestOptions: youtube_v3.Params$Resource$Search$List = {
      key: process.env.YOUTUBE_API_KEY,
      q: searchQuery,
      part: ['snippet'],
      type: ['video'],
      order: 'relevance',
      maxResults: 5,
    };

    const response = await this.youtube.search.list(requestOptions);

    const result = response.data.items.map((item) => {
      return {
        title: item.snippet?.title,
        thumbnail: item.snippet?.thumbnails?.high?.url,
        author: item.snippet?.channelTitle,
        link: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      };
    });

    return result;
  }
}
