import { Controller, Get, Query } from '@nestjs/common';
import { RawgTagsService } from './rawg-tags.service';

@Controller('tags')
export class RawgTagsController {
  constructor(private readonly tagsService: RawgTagsService) {}

  @Get()
  async getTags(@Query('page') page: number) {
    return this.tagsService.getTags(page);
  }
}
