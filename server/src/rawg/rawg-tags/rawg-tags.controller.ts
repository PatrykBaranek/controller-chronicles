import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RawgTagsService } from './rawg-tags.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsDto } from './dto/tags.dto';

@ApiTags('api/tags')
@Controller('tags')
export class RawgTagsController {
  constructor(private readonly tagsService: RawgTagsService) {}

  @ApiOperation({ summary: 'Get all tags from rawgapi' })
  @ApiQuery({ name: 'page', description: 'Page number', type: Number })
  @ApiQuery({
    name: 'page_size',
    description: 'Number of results per page',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of tags',
    type: [TagsDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid page or page_size' })
  @Get()
  async getTags(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.tagsService.getTags(page, page_size);
  }
}
