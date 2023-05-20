import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarService } from './reviews-sites-gameradar.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';

@Module({
  imports: [PuppeteerModule, RawgGamesModule],
  providers: [ReviewsSitesGameradarService],
})
export class ReviewsSitesGameradarModule {}
