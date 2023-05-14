import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RawgDevelopersService } from './rawg-developers.service';

@Controller('developers')
export class RawgDevelopersController {
  constructor(private readonly developersService: RawgDevelopersService) {}

  @Get()
  getDevelopers() {
    return this.developersService.getDevelopers();
  }

  @Get('/:id')
  getDeveloperById(@Param('id', ParseIntPipe) id: number) {
    return this.developersService.getDeveloper(id);
  }
}
