import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { IgdbApiService } from '../igdb-api.service';
import { IgdbAuthService } from '../../igdb-auth/igdb-auth.service';
import {
  buildApicalypseCountQuery,
  buildApicalypseQuery,
} from 'src/igdb/helpers/apicalypse-query.builder';
import { paginate } from 'src/app/common/helpers/pagination.helper';
import { IgdbGenreDto } from 'src/igdb/igdb-genres/dto/igdb-genre.dto';
import { IgdbNamedEntity } from 'src/igdb/types/igdb-genre-response';

const GENRE_FIELDS = ['name', 'slug'];

@Injectable()
export class IgdbApiGenresService extends IgdbApiService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly igdbAuthService: IgdbAuthService,
    protected readonly configService: ConfigService,
  ) {
    super(httpService, igdbAuthService, configService, 'genres');
  }

  async getGenres(page: number, page_size: number) {
    const query = buildApicalypseQuery({
      fields: GENRE_FIELDS,
      limit: page_size,
      offset: (page - 1) * page_size,
    });

    const [results, totalItems] = await Promise.all([
      this.query<IgdbNamedEntity>(query),
      this.count(buildApicalypseCountQuery({})),
    ]);

    return paginate(results, totalItems, page, page_size, IgdbGenreDto, {
      showTotalPages: false,
    });
  }

  async getGenreById(id: number) {
    const query = buildApicalypseQuery({
      fields: GENRE_FIELDS,
      where: `id = ${id}`,
      limit: 1,
    });

    const [genre] = await this.query<IgdbNamedEntity>(query);

    return genre;
  }
}
