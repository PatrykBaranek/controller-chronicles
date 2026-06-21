import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { IgdbDevelopersService } from './igdb-developers.service';
import { IgdbDeveloperResponseDto } from './dto/igdb-developer-response.dto';

@ApiTags('api/developers')
@Controller('developers')
@AllowAnonymous()
export class IgdbDevelopersController {
  constructor(private readonly developersService: IgdbDevelopersService) {}

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
    type: [IgdbDeveloperResponseDto],
  })
  @Get()
  getDevelopers(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.developersService.getDevelopers(page, page_size);
  }

  @ApiOperation({ summary: 'Get developer by id' })
  @ApiParam({ name: 'id', description: 'The ID of the developer', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns developer details by id',
    type: IgdbDeveloperResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Developer not found' })
  @Get('/:id')
  getDeveloperById(@Param('id', ParseIntPipe) id: number) {
    return this.developersService.getDeveloper(id);
  }
}
