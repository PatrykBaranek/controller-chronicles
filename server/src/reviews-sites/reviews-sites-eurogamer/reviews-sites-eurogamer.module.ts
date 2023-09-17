import { Module, forwardRef } from '@nestjs/common';

import { FuzzyCompareService } from '../util/fuzzy-compare.service';

import { ReviewsSitesEurogamerService } from './reviews-sites-eurogamer.service';

import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';

import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    PuppeteerModule,
    forwardRef(() => GamesModule)
  ],
  providers: [ReviewsSitesEurogamerService, FuzzyCompareService],
  exports: [ReviewsSitesEurogamerService],
})
export class ReviewsSitesEurogamerModule {}
