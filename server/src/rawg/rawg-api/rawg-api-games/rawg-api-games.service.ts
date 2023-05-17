import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { RawgApiService } from '../rawg-api.service';
import { AxiosResponse } from 'axios';
import { GetGameQueryParamsDto } from 'src/rawg/rawg-games/dto/get-game-query-params.dto';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { RawgGameResponse } from 'src/rawg/types/rawg-game-response';
import { GetGameStoresResponse } from 'src/rawg/types/rawg-game-stores-response';
import { GetStoresResponse } from 'src/rawg/types/rawg-stores-response';
import { HttpService } from '@nestjs/axios';
import { paginateResponse } from 'src/rawg/helpers/pagination.helper';

@Injectable()
export class RawgApiGamesService extends RawgApiService {
  constructor(protected readonly httpService: HttpService) {
    super(httpService, 'games');
  }

  async getGames(options?: GetGameQueryParamsDto) {
    const { page, page_size, stores, metacritic, ordering, search, tags } =
      options;

    const paramsObject: Record<string, string> = {
      key: process.env.RAWG_API_KEY,
      ...(page && { page: page.toString() }),
      ...(page_size && { page_size: page_size.toString() }),
      ...(stores && { stores }),
      ...(metacritic && { metacritic: metacritic.toString() }),
      ...(ordering && { ordering: ordering.toString() }),
      ...(tags && { tags: tags.toLocaleLowerCase() }),
      ...(search && { search }),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `${this.rawgApiUrl}`;

    const response: AxiosResponse = await this.httpService.axiosRef.get(url, {
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

      return response.data;
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
