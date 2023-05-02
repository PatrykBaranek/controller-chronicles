import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { RawgGameResponse } from './types/rawg-game-response';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { plainToInstance } from 'class-transformer';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';
import { HowLongToBeatService } from 'howlongtobeat';
import { HowLongToBeatResponseDto } from './dto/how-long-to-beat-response.dto';
import { GetGameStoresResponse } from './types/rawg-game-stores-response';
import { GetStoresResponse } from './types/rawg-stores-response';
import { PaginationDto } from './dto/pagination.dto';
import { YoutubeService } from './youtube/youtube.service';

@Injectable()
export class GamesService {
  private readonly rawgApiUrl = 'https://api.rawg.io/api/games';
  private readonly hltbService: HowLongToBeatService;

  constructor(private readonly httpService: HttpService) {
    this.hltbService = new HowLongToBeatService();
  }

  getGames(
    options?: GetGameQueryParamsDto,
  ): Observable<PaginationDto<RawgGameResponseDto>> {
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

    const url = `${this.rawgApiUrl}?${httpParams.toString()}`;

    return this.httpService.get(url).pipe(
      map((response) => {
        const games = response.data.results as Object[];

        return {
          totalItems: response.data.count,
          totalPages: Math.ceil(response.data.count / page_size),
          currentPage: page,
          results: plainToInstance(RawgGameResponseDto, games),
        };
      }),
    );
  }

  async getGameById(id: number): Promise<{
    rawgGame: RawgGameResponseDto;
    howLongToBeat: HowLongToBeatResponseDto;
  }> {
    const rawgGame = await this.httpService.axiosRef
      .get<RawgGameResponse>(
        `${this.rawgApiUrl}/${id}?key=${process.env.RAWG_API_KEY}`,
      )
      .then((response) => response.data);

    const hltbGame = await this.hltbService.search(rawgGame.name);

    return {
      rawgGame: plainToInstance(RawgGameResponseDto, rawgGame),
      howLongToBeat: plainToInstance(HowLongToBeatResponseDto, hltbGame[0]),
    };
  }

  async getGameTrailersById(id: number) {
    const rawgGameTrailers = await this.httpService.axiosRef.get(
      `${this.rawgApiUrl}/${id}/movies?key=${process.env.RAWG_API_KEY}`,
    );

    return rawgGameTrailers.data;
  }

  async getGameStoresByGameId(id: number) {
    const gameStores =
      await this.httpService.axiosRef.get<GetGameStoresResponse>(
        `${this.rawgApiUrl}/${id}/stores?key=${process.env.RAWG_API_KEY}`,
      );

    const stores = await this.httpService.axiosRef.get<GetStoresResponse>(
      `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`,
    );

    const result = gameStores.data.results.map((store) => {
      return {
        id: store.id,
        name: stores.data.results.find((s) => s.id === store.store_id).name,
        url: store.url,
      };
    });

    return result;
  }
}
