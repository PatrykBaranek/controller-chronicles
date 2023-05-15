import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RawgDevelopersService } from './rawg-developers.service';

@Controller('developers')
export class RawgDevelopersController {
  constructor(private readonly developersService: RawgDevelopersService) {}

  @Get()
  getDevelopers(
    @Query('page') page: number,
    @Query('page_size') page_size: number,
  ) {
    return this.developersService.getDevelopers(page, page_size);
  }

  @Get('/:id')
  getDeveloperById(@Param('id', ParseIntPipe) id: number) {
    return this.developersService.getDeveloper(id);
  }
}
