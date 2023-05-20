import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarService } from './reviews-sites-gameradar.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';

@Module({
  imports: [PuppeteerModule],
  providers: [ReviewsSitesGameradarService],
})
export class ReviewsSitesGameradarModule {}
