import { Module, forwardRef } from '@nestjs/common';

import { FuzzyCompareService } from '../util/fuzzy-compare.service';

import { ReviewsSitesGamesradarService } from './reviews-sites-gamesradar.service';

import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';

import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    PuppeteerModule,
    forwardRef(() => GamesModule)
  ],
  providers: [ReviewsSitesGamesradarService, FuzzyCompareService],
  exports: [ReviewsSitesGamesradarService],
})
export class ReviewsSitesGamesradarModule {}
