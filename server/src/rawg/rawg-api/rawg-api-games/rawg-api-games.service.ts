import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  constructor(
    protected readonly httpService: HttpService,
    private readonly configService: ConfigService,
    ) {
    super(httpService, 'games');
  }

  protected get rawgApiKey() {
    return this.configService.get<string>('RAWG_API_KEY');
  }

  async getGames(options?: GetGameQueryParamsDto) {
      const { page, page_size } = options;
      
      const params: Record<string, string> = Object.entries(options).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = String(value);
        }
        return acc;
      }, {});

      params.key = this.rawgApiKey;

      const httpParams = new URLSearchParams(params);

      const url = `${this.rawgApiUrl}`;

      const response: AxiosResponse = await this.httpService.axiosRef.get<RawgGameResponse>(url, {
        params: httpParams,
      });

      return paginateResponse(response, page, page_size, RawgGameResponseDto, {
        showTotalPages: true,
      });
  }

  async getGameById(id: number) {
      const response = await this.httpService.axiosRef.get<RawgGameResponse>(
        `${this.rawgApiUrl}/${id}?key=${this.rawgApiKey}`,
      );

      return plainToInstance(RawgGameSingleResponseDto, response.data);
  }

  async getGameStoresByGameId(id: number) {
    const gameStores =
      await this.httpService.axiosRef.get<GetGameStoresResponse>(
        `${this.rawgApiUrl}/${id}/stores?key=${this.rawgApiKey}`,
      );

    const stores = await this.httpService.axiosRef.get<GetStoresResponse>(
      `https://api.rawg.io/api/stores?key=${this.rawgApiKey}`,
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
