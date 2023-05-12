import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { GetGameQueryParamsDto } from '../dto/get-game-query-params.dto';
import { AxiosResponse } from 'axios';
import { RawgGameResponse } from '../types/rawg-game-response';
import { GetStoresResponse } from '../types/rawg-stores-response';
import { GetGameStoresResponse } from '../types/rawg-game-stores-response';
import { RawgGameResponseDto } from '../dto/rawg-game-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RawgApiService {
  private readonly rawgApiUrl = 'https://api.rawg.io/api/games';

  constructor(private readonly httpService: HttpService) {}

  async getGames(options?: GetGameQueryParamsDto) {
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

    const response: AxiosResponse = await this.httpService.axiosRef.get(url);

    const totalPages = Math.ceil(response.data.count / page_size);

    if (page > totalPages) {
      throw new NotFoundException(
        'Page number cannot be greater than page size',
      );
    }

    const games = response.data.results as RawgGameResponseDto[];

    return {
      totalItems: response.data.count,
      totalPages,
      currentPage: page,
      results: plainToInstance(RawgGameResponseDto, games),
    };
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
