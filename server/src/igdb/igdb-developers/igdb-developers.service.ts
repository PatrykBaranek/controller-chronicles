import { Injectable } from '@nestjs/common';
import { IgdbApiCompaniesService } from '../igdb-api/igdb-api-companies/igdb-api-companies.service';

@Injectable()
export class IgdbDevelopersService {
  constructor(
    private readonly igdbApiCompaniesService: IgdbApiCompaniesService,
  ) {}

  getDevelopers(page: number, page_size: number) {
    return this.igdbApiCompaniesService.getDevelopers(page, page_size);
  }

  getDeveloper(id: number) {
    return this.igdbApiCompaniesService.getDeveloper(id);
  }
}
