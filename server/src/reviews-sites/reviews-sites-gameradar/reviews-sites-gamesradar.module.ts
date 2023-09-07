import { Module } from '@nestjs/common';
import { ReviewsSitesGamesradarService } from './reviews-sites-gamesradar.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { FuzzyCompareService } from '../util/fuzzy-compare.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [PuppeteerModule, GamesModule],
  providers: [ReviewsSitesGamesradarService, FuzzyCompareService],
  exports: [ReviewsSitesGamesradarService],
})
export class ReviewsSitesGamesradarModule {}
