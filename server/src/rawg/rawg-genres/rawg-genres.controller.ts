import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RawgGenresService } from './rawg-genres.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class RawgGenresController {
  constructor(private readonly genresService: RawgGenresService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @Get()
  async getGenres(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.genresService.getGenres(page, page_size);
  }
}
