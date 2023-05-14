import { Controller, Get } from '@nestjs/common';
import { RawgGenresService } from './rawg-genres.service';

@Controller('genres')
export class RawgGenresController {
  constructor(private readonly genresService: RawgGenresService) {}

  @Get()
  async getGenres() {
    return this.genresService.getGenres();
  }
}
