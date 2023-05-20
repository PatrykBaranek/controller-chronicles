import { Module } from '@nestjs/common';
import { ReviewsSitesIgnService } from './reviews-sites-ign.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';

@Module({
  imports: [PuppeteerModule],
  providers: [ReviewsSitesIgnService],
})
export class ReviewsSitesIgnModule {}
