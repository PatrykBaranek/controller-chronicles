import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { IgdbAuthModule } from '../igdb-auth/igdb-auth.module';
import { IgdbApiGamesService } from './igdb-api-games/igdb-api-games.service';
import { IgdbApiGenresService } from './igdb-api-genres/igdb-api-genres.service';
import { IgdbApiCompaniesService } from './igdb-api-companies/igdb-api-companies.service';

@Module({
  imports: [HttpModule, IgdbAuthModule],
  providers: [
    IgdbApiGamesService,
    IgdbApiGenresService,
    IgdbApiCompaniesService,
  ],
  exports: [
    IgdbApiGamesService,
    IgdbApiGenresService,
    IgdbApiCompaniesService,
  ],
})
export class IgdbApiModule {}
