import { Injectable } from '@nestjs/common';
import { RawgApiService } from '../rawg-api.service';
import { HttpService } from '@nestjs/axios';
import { paginateResponse } from 'src/rawg/helpers/pagination.helper';
import { RawgGenreDto } from 'src/rawg/rawg-genres/dto/rawg-genre.dto';

@Injectable()
export class RawgApiGenresService extends RawgApiService {
  constructor(protected readonly httpService: HttpService) {
    super(httpService, 'genres');
  }

  async getGenres(page: number, page_size: number) {
    const url = `${this.rawgApiUrl}?key=${process.env.RAWG_API_KEY}`;

    const response = await this.httpService.axiosRef.get(url);

    return paginateResponse(response, page, page_size, RawgGenreDto, {
      showTotalPages: false,
    });
  }

  async getGenreById(id: number) {
    const url = `${this.rawgApiUrl}/${id}?key=${process.env.RAWG_API_KEY}`;

    const response = await this.httpService.axiosRef.get(url);

    return response.data;
  }
}
