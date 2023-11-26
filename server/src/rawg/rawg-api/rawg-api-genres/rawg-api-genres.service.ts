import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RawgApiService } from '../rawg-api.service';
import { paginateResponse } from 'src/rawg/helpers/pagination.helper';
import { RawgGenreDto } from 'src/rawg/rawg-genres/dto/rawg-genre.dto';

@Injectable()
export class RawgApiGenresService extends RawgApiService {
  constructor(
    protected readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super(httpService, 'genres');
  }

  async getGenres(page: number, page_size: number) {
    const paramsObject = {
      key: this.configService.get<string>('RAWG_API_KEY'),
      page: page.toString(),
      page_size: page_size.toString(),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const response = await this.httpService.axiosRef.get(this.rawgApiUrl, {
      params: httpParams,
    });

    return paginateResponse(response, page, page_size, RawgGenreDto, {
      showTotalPages: false,
    });
  }

  async getGenreById(id: number) {
    const url = `${this.rawgApiUrl}/${id}?key=${this.configService.get<string>('RAWG_API_KEY')}`;

    const response = await this.httpService.axiosRef.get(url);

    return response.data;
  }
}
