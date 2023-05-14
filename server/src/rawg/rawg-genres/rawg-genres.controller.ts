import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RawgGenresService } from './rawg-genres.service';

@Controller('genres')
export class RawgGenresController {
  constructor(private readonly genresService: RawgGenresService) {}

  @Get()
  async getGenres(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.genresService.getGenres(page, page_size);
  }
}
