import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RawgTagsService } from './rawg-tags.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class RawgTagsController {
  constructor(private readonly tagsService: RawgTagsService) {}

  @ApiOperation({ summary: 'Get all tags from rawgapi' })
  @Get()
  async getTags(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.tagsService.getTags(page, page_size);
  }
}
