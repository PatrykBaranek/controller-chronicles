import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { IgdbApiService } from '../igdb-api.service';
import { IgdbAuthService } from '../../igdb-auth/igdb-auth.service';
import { buildApicalypseCountQuery, buildApicalypseQuery } from 'src/igdb/helpers/apicalypse-query.builder';
import { paginate } from 'src/app/common/helpers/pagination.helper';
import { IgdbDeveloperResponseDto } from 'src/igdb/igdb-developers/dto/igdb-developer-response.dto';
import { IgdbNamedEntity } from 'src/igdb/types/igdb-genre-response';

const COMPANY_FIELDS = ['name', 'slug'];

@Injectable()
export class IgdbApiCompaniesService extends IgdbApiService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly igdbAuthService: IgdbAuthService,
    protected readonly configService: ConfigService,
  ) {
    // IGDB has no developer/publisher flag on the `companies` resource itself
    // (that distinction only exists per-game via `involved_companies`), so
    // this lists all companies rather than filtering to "developers only".
    super(httpService, igdbAuthService, configService, 'companies');
  }

  async getDevelopers(page: number, page_size: number) {
    const query = buildApicalypseQuery({
      fields: COMPANY_FIELDS,
      limit: page_size,
      offset: (page - 1) * page_size,
    });

    const [results, totalItems] = await Promise.all([
      this.query<IgdbNamedEntity>(query),
      this.count(buildApicalypseCountQuery({})),
    ]);

    return paginate(
      results,
      totalItems,
      page,
      page_size,
      IgdbDeveloperResponseDto,
      { showTotalPages: false },
    );
  }

  async getDeveloper(id: number) {
    const query = buildApicalypseQuery({
      fields: COMPANY_FIELDS,
      where: `id = ${id}`,
      limit: 1,
    });

    const [company] = await this.query<IgdbNamedEntity>(query);

    return company;
  }
}
