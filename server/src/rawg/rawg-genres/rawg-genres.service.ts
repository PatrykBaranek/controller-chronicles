import { Injectable } from '@nestjs/common';
import { RawgApiGenresService } from '../rawg-api/rawg-api-genres/rawg-api-genres.service';

@Injectable()
export class RawgGenresService {
  constructor(private readonly rawgApiGenresService: RawgApiGenresService) {}

  async getGenres(page: number, page_size: number) {
    return this.rawgApiGenresService.getGenres(page, page_size);
  }
}
