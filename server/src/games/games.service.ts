import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';
import { RawgGameResponse } from './types/rawg-game-response';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { plainToInstance } from 'class-transformer';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';
import { HowLongToBeatService } from 'howlongtobeat';
import { HowLongToBeatResponseDto } from './dto/how-long-to-beat-response.dto';

@Injectable()
export class GamesService {
  private readonly hltbService: HowLongToBeatService;

  constructor(private readonly httpService: HttpService) {
    this.hltbService = new HowLongToBeatService();
  }

  getGames(options?: GetGameQueryParamsDto) {
    const { page, page_size, stores, metacritic, ordering, search } = options;

    const paramsObject: Record<string, string> = {
      key: process.env.RAWG_API_KEY,
      ...(page && { page: page.toString() }),
      ...(page_size && { page_size: page_size.toString() }),
      ...(stores && { stores }),
      ...(metacritic && { metacritic: metacritic.toString() }),
      ...(ordering && { ordering: ordering.toString() }),
      ...(search && { search }),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `https://api.rawg.io/api/games?${httpParams.toString()}`;

    return this.httpService.get(url).pipe(
      map((response) => {
        const games = response.data.results as Object[];

        return {
          totalItems: response.data.count,
          totalPages: Math.ceil(response.data.count / page_size),
          currentPage: page,
          games: plainToInstance(RawgGameResponseDto, games),
        };
      }),
    );
  }

  getGameById(id: number): Observable<{
    rawgGame: RawgGameResponseDto;
    howLongToBeat: HowLongToBeatResponseDto;
  }> {
    const game = this.httpService
      .get<RawgGameResponse>(
        `https://api.rawg.io/api/games/${id}
          ?key=${process.env.RAWG_API_KEY}`,
      )
      .pipe(map((response: AxiosResponse<RawgGameResponse>) => response.data));

    const hltbGame = game.pipe(
      map((game) => this.hltbService.search(game.name)),
      switchMap((promise) => from(promise)),
    );

    return forkJoin([game, hltbGame]).pipe(
      map(([rawgGame, hltbGame]) => {
        return {
          rawgGame: plainToInstance(RawgGameResponseDto, rawgGame),
          howLongToBeat: plainToInstance(HowLongToBeatResponseDto, hltbGame[0]),
        };
      }),
    );
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
