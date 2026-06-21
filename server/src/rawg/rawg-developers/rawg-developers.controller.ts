import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RawgDevelopersService } from './rawg-developers.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RawgDeveloperResponseDto } from './dto/rawg-developer-response.dto';

@ApiTags('api/developers')
@Controller('developers')
export class RawgDevelopersController {
  constructor(private readonly developersService: RawgDevelopersService) {}

  @ApiOperation({ summary: 'Get all developers' })
  @ApiQuery({ name: 'page', description: 'Page number', type: Number })
  @ApiQuery({
    name: 'page_size',
    description: 'Number of results per page',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Return all developers',
    type: [RawgDeveloperResponseDto],
  })
  @Get()
  getDevelopers(
    @Query('page') page: number,
    @Query('page_size') page_size: number,
  ) {
    return this.developersService.getDevelopers(page, page_size);
  }

  @ApiOperation({ summary: 'Get developer by id' })
  @ApiParam({ name: 'id', description: 'The ID of the developer', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns developer details by id',
    type: RawgDeveloperResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Developer not found' })
  @Get('/:id')
  getDeveloperById(@Param('id', ParseIntPipe) id: number) {
    return this.developersService.getDeveloper(id);
  }
}
