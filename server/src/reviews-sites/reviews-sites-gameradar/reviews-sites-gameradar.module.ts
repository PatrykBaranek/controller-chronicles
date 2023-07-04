import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarService } from './reviews-sites-gameradar.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { FuzzyCompareService } from '../fuzzy-compare.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [PuppeteerModule, GamesModule],
  providers: [ReviewsSitesGameradarService, FuzzyCompareService],
  exports: [ReviewsSitesGameradarService],
})
export class ReviewsSitesGameradarModule {}
