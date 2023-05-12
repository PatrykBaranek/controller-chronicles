import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/games/dto/pagination.dto';
import { TagsDto } from './dto/tags.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TagsService {
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
