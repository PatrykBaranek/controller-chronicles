import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RawgDevelopersService } from './rawg-developers.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RawgDeveloperResponseDto } from './dto/rawg-developer-response.dto';

@ApiTags('developers')
@Controller('developers')
export class RawgDevelopersController {
  constructor(private readonly developersService: RawgDevelopersService) {}

  @ApiOperation({ summary: 'Get all developers' })
  @ApiResponse({
    status: 200,
    description: 'Return all developers',
    type: RawgDeveloperResponseDto,
  })
  @Get()
  getDevelopers(
    @Query('page') page: number,
    @Query('page_size') page_size: number,
  ) {
    return this.developersService.getDevelopers(page, page_size);
  }

  @ApiOperation({ summary: 'Get developer by id' })
  @ApiParam({ name: 'id', type: Number })
  @Get('/:id')
  getDeveloperById(@Param('id', ParseIntPipe) id: number) {
    return this.developersService.getDeveloper(id);
  }
}
