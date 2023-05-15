import { Injectable } from '@nestjs/common';
import { RawgApiDevelopersService } from '../rawg-api/rawg-api-developers/rawg-api-developers.service';

@Injectable()
export class RawgDevelopersService {
  constructor(
    private readonly rawgApiDevelopersService: RawgApiDevelopersService,
  ) {}

  getDevelopers(page: number, page_size: number) {
    return this.rawgApiDevelopersService.getDevelopers(page, page_size);
  }

  getDeveloper(id: number) {
    return this.rawgApiDevelopersService.getDeveloper(id);
  }
}
