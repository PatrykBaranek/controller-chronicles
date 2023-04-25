import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { RawgGameResponse } from './types/rawg-game-response';
import { RawgGameOptionParams } from './types/rawg-game-query-params';

@Injectable()
export class GamesService {
  constructor(private readonly httpService: HttpService) {}

  getGames(
    options?: RawgGameOptionParams,
  ): Observable<AxiosResponse<RawgGameResponse[]>> {
    const { page, page_size, stores, metacritic, ordering, search } = options;

    const httpParams = new URLSearchParams({
      key: process.env.RAWG_API_KEY,
      ...(page && { page: page.toString() }),
      ...(page_size && { page_size: page_size.toString() }),
      ...(stores && { stores }),
      ...(metacritic && { metacritic: metacritic.toString() }),
      ...(ordering && { ordering }),
      ...(search && { search: search.toString() }),
    });

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
}
