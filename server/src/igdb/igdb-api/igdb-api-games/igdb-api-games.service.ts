import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';

import { IgdbApiService } from '../igdb-api.service';
import { IgdbAuthService } from '../../igdb-auth/igdb-auth.service';
import {
  buildApicalypseCountQuery,
  buildApicalypseQuery,
} from 'src/igdb/helpers/apicalypse-query.builder';
import { paginate } from 'src/app/common/helpers/pagination.helper';

import { GetGameQueryParamsDto } from 'src/games/dto/get-game-query-params.dto';
import { IgdbGameResponseDto } from './dto/igdb-game-response.dto';
import { IgdbGameSingleResponseDto } from './dto/igdb-game-single-response.dto';
import { IgdbGameResponse } from 'src/igdb/types/igdb-game-response';

const GAME_FIELDS = [
  'name',
  'slug',
  'summary',
  'first_release_date',
  'aggregated_rating',
  'cover.image_id',
  'screenshots.image_id',
  'websites.url',
  'websites.category',
  'genres.id',
  'genres.name',
  'genres.slug',
  'platforms.id',
  'platforms.name',
  'platforms.slug',
  'involved_companies.company.id',
  'involved_companies.company.name',
  'involved_companies.company.slug',
  'involved_companies.developer',
  'involved_companies.publisher',
];

const IMAGE_BASE_URL = 'https://images.igdb.com/igdb/image/upload/t_1080p';

@Injectable()
export class IgdbApiGamesService extends IgdbApiService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly igdbAuthService: IgdbAuthService,
    protected readonly configService: ConfigService,
  ) {
    super(httpService, igdbAuthService, configService, 'games');
  }

  async getGames(options?: GetGameQueryParamsDto) {
    const { page = 1, page_size = 5 } = options ?? {};
    const where = this.buildWhereClause(options);
    const sort = this.buildSortClause(options?.ordering);

    const query = buildApicalypseQuery({
      fields: GAME_FIELDS,
      search: options?.search,
      where,
      sort,
      limit: page_size,
      offset: (page - 1) * page_size,
    });

    const countQuery = buildApicalypseCountQuery({
      search: options?.search,
      where,
    });

    const [results, totalItems] = await Promise.all([
      this.query<IgdbGameResponse>(query),
      this.count(countQuery),
    ]);

    const mappedResults = results.map((game) => this.mapGame(game));

    return paginate(
      mappedResults,
      totalItems,
      page,
      page_size,
      IgdbGameResponseDto,
      { showTotalPages: true },
    );
  }

  async getGameById(id: number): Promise<IgdbGameSingleResponseDto> {
    const query = buildApicalypseQuery({
      fields: GAME_FIELDS,
      where: `id = ${id}`,
      limit: 1,
    });

    const [game] = await this.query<IgdbGameResponse>(query);

    return plainToInstance(IgdbGameSingleResponseDto, this.mapGame(game));
  }

  private mapGame(game: IgdbGameResponse) {
    const involvedCompanies = game.involved_companies ?? [];

    return {
      id: game.id,
      slug: game.slug,
      name: game.name,
      description: game.summary,
      firstReleaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000)
        : undefined,
      aggregatedRating: game.aggregated_rating,
      background_image: game.cover
        ? `${IMAGE_BASE_URL}/${game.cover.image_id}.jpg`
        : undefined,
      screenshots: game.screenshots?.map(
        (screenshot) => `${IMAGE_BASE_URL}/${screenshot.image_id}.jpg`,
      ),
      websites: game.websites?.map((website) => ({
        url: website.url,
        category: website.category,
      })),
      genres: game.genres,
      platforms: game.platforms,
      developers: involvedCompanies
        .filter((involvedCompany) => involvedCompany.developer)
        .map((involvedCompany) => involvedCompany.company),
      publishers: involvedCompanies
        .filter((involvedCompany) => involvedCompany.publisher)
        .map((involvedCompany) => involvedCompany.company),
    };
  }

  private buildWhereClause(options?: GetGameQueryParamsDto): string | undefined {
    if (!options) return undefined;

    const conditions: string[] = [];

    if (options.genres) {
      conditions.push(`genres = (${options.genres})`);
    }

    if (options.platforms) {
      conditions.push(`platforms = (${options.platforms})`);
    }

    if (options.publishers) {
      conditions.push(`involved_companies.company = (${options.publishers})`);
    }

    if (options.metacritic) {
      conditions.push(`aggregated_rating >= ${options.metacritic}`);
    }

    if (options.dates) {
      const [from, to] = options.dates.split(',');

      if (from) {
        conditions.push(
          `first_release_date >= ${Math.floor(new Date(from).getTime() / 1000)}`,
        );
      }

      if (to) {
        conditions.push(
          `first_release_date <= ${Math.floor(new Date(to).getTime() / 1000)}`,
        );
      }
    }

    return conditions.length ? conditions.join(' & ') : undefined;
  }

  private buildSortClause(ordering?: unknown): string | undefined {
    if (!ordering || typeof ordering !== 'string') return undefined;

    const direction = ordering.startsWith('-') ? 'desc' : 'asc';
    const field = ordering.replace(/^-/, '');

    const fieldMap: Record<string, string> = {
      name: 'name',
      released: 'first_release_date',
      rating: 'aggregated_rating',
      updated: 'updated_at',
    };

    const igdbField = fieldMap[field];

    return igdbField ? `${igdbField} ${direction}` : undefined;
  }
}
