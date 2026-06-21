import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { IgdbGenresService } from './igdb-genres.service';
import { IgdbGenreDto } from './dto/igdb-genre.dto';

@ApiTags('api/genres')
@Controller('genres')
@AllowAnonymous()
export class IgdbGenresController {
  constructor(private readonly genresService: IgdbGenresService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @ApiQuery({ name: 'page', description: 'Page number', type: Number })
  @ApiQuery({
    name: 'page_size',
    description: 'Number of results per page',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of genres',
    type: [IgdbGenreDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid page or page_size' })
  @Get()
  async getGenres(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.genresService.getGenres(page, page_size);
  }
}
