import { Module } from '@nestjs/common';
import { ReviewsSitesEurogamerService } from './reviews-sites-eurogamer.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { FuzzyCompareService } from '../fuzzy-compare.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [PuppeteerModule, GamesModule],
  providers: [ReviewsSitesEurogamerService, FuzzyCompareService],
  exports: [ReviewsSitesEurogamerService],
})
export class ReviewsSitesEurogamerModule {}
