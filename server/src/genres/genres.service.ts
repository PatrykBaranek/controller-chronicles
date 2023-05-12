import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GenresDto } from './dto/genres.dto';

@Injectable()
export class GenresService {
  constructor(private readonly httpService: HttpService) {}

  async getGenres() {
    const response = await this.httpService.axiosRef.get(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`,
    );
    return plainToInstance(GenresDto, response.data.results);
  }
}
