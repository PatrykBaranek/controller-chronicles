import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { plainToInstance } from 'class-transformer';

import { paginateResponse } from 'src/rawg/helpers/pagination.helper';

import { GetGameQueryParamsDto } from 'src/games/dto/get-game-query-params.dto';
import { RawgApiService } from '../rawg-api.service';
import { RawgGameSingleResponseDto } from './dto/rawg-game-single-response.dto';
import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';

import { RawgGameResponse } from 'src/rawg/types/rawg-game-response';
import { GetStoresResponse } from 'src/rawg/types/rawg-stores-response';
import { GetGameStoresResponse } from 'src/rawg/types/rawg-game-stores-response';


@Injectable()
export class RawgApiGamesService extends RawgApiService {
  constructor(protected readonly httpService: HttpService) {
    super(httpService, 'games');
  }

  async getGames(options?: GetGameQueryParamsDto) {
    const { page, page_size, stores, metacritic, ordering, search, tags, dates } = options;

    const paramsObject: Record<string, string> = {
      key: process.env.RAWG_API_KEY,
      ...(page && { page: String(page) }),
      ...(page_size && { page_size: String(page_size) }),
      ...(stores && { stores }),
      ...(metacritic && { metacritic: metacritic }),
      ...(ordering && { ordering: String(ordering) }),
      ...(tags && { tags: tags.toLowerCase() }),
      ...(search && { search }),
      ...(dates && { dates: dates }),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `${this.rawgApiUrl}`;

    const response: AxiosResponse = await this.httpService.axiosRef.get<RawgGameResponse>(url, {
      params: httpParams,
    });

    return paginateResponse(response, page, page_size, RawgGameResponseDto, {
      showTotalPages: true,
    });
  }

  async getGameById(id: number) {
    try {
      const response = await this.httpService.axiosRef.get<RawgGameResponse>(
        `${this.rawgApiUrl}/${id}?key=${process.env.RAWG_API_KEY}`,
      );

      return plainToInstance(RawgGameSingleResponseDto, response.data);
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
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
