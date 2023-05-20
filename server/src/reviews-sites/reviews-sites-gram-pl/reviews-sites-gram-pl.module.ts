import { Module } from '@nestjs/common';
import { ReviewsSitesGramPlService } from './reviews-sites-gram-pl.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';

@Module({
  imports: [PuppeteerModule],
  providers: [ReviewsSitesGramPlService],
})
export class ReviewsSitesGramPlModule {}
