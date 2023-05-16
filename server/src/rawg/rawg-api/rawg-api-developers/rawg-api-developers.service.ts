import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RawgApiService } from '../rawg-api.service';
import { paginateResponse } from 'src/rawg/helpers/pagination.helper';
import { RawgDeveloperResponseDto } from 'src/rawg/rawg-developers/dto/rawg-developer-response.dto';

@Injectable()
export class RawgApiDevelopersService extends RawgApiService {
  constructor(protected readonly httpService: HttpService) {
    super(httpService, 'developers');
  }

  async getDevelopers(page: number, page_size: number) {
    const paramsObject = {
      key: process.env.RAWG_API_KEY,
      page: page.toString(),
      page_size: page_size.toString(),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `${this.rawgApiUrl}?${httpParams}`;

    const response = await this.httpService.axiosRef.get(url);

    return paginateResponse(
      response,
      page,
      page_size,
      RawgDeveloperResponseDto,
      { showTotalPages: false },
    );
  }

  async getDeveloper(id: number) {
    const url = `${this.rawgApiUrl}/${id}?key=${process.env.RAWG_API_KEY}`;

    const response = await this.httpService.axiosRef.get(url);

    return response.data;
  }
}
