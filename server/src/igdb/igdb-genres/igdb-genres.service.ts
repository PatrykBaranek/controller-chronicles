import { Injectable } from '@nestjs/common';
import { IgdbApiGenresService } from '../igdb-api/igdb-api-genres/igdb-api-genres.service';

@Injectable()
export class IgdbGenresService {
  constructor(private readonly igdbApiGenresService: IgdbApiGenresService) {}

  getGenres(page: number, page_size: number) {
    return this.igdbApiGenresService.getGenres(page, page_size);
  }
}
