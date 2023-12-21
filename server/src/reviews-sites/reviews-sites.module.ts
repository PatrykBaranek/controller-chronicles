import { Module, forwardRef } from '@nestjs/common';

import { ReviewsSitesService } from './services/reviews-sites.service';
import { ReviewsSitesController } from './controllers/reviews-sites.controller';
import { ReviewsSitesScraperFactory } from './services/strategies/reviews-sites-scraper-factory';

import { FuseJsCompareService } from './util/fuse-js-compare.service';

import { GamesModule } from 'src/games/games.module';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';

@Module({
  imports: [
    PuppeteerModule,
    forwardRef(() => GamesModule),
  ],
  controllers: [ReviewsSitesController],
  providers: [ReviewsSitesService, ReviewsSitesScraperFactory, FuseJsCompareService],
  exports: [ReviewsSitesService]
})
export class ReviewsSitesModule {}
