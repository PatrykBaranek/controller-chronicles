import { Module } from '@nestjs/common';
import { HowLongToBeatService } from './how-long-to-beat.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';

@Module({
  providers: [HowLongToBeatService, PuppeteerService],
  imports: [PuppeteerModule],
  exports: [HowLongToBeatService, PuppeteerService],
})
export class HowLongToBeatModule {}
