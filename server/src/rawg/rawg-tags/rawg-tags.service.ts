import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { TagsDto } from './dto/tags.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '../rawg-games/dto/pagination.dto';

@Injectable()
export class RawgTagsService {
  constructor(private readonly httpService: HttpService) {}

  async getTags(page: number): Promise<PaginationDto<TagsDto>> {
    const response = await this.httpService.axiosRef.get(
      `https://api.rawg.io/api/tags?key=${process.env.RAWG_API_KEY}`,
    );
    return {
      totalItems: response.data.count,
      totalPages: Math.ceil(response.data.count / 20),
      currentPage: page,
      results: plainToInstance(TagsDto, response.data.results as TagsDto[]),
    };
  }
}
