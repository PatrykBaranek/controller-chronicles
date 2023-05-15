import { Injectable } from '@nestjs/common';
import { RawgApiTagsService } from '../rawg-api/rawg-api-tags/rawg-api-tags.service';

@Injectable()
export class RawgTagsService {
  constructor(private readonly rawgApiTagsService: RawgApiTagsService) {}

  async getTags(page: number, page_size: number) {
    return this.rawgApiTagsService.getTags(page, page_size);
  }
}
