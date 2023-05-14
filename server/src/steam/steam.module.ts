import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SteamBestSellers,
  SteamBestSellersSchema,
} from './models/steam-bestsellers.schema';
import { SteamService } from './steam.service';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';
import { SteamReposiiory } from './steam.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SteamBestSellers.name, schema: SteamBestSellersSchema },
    ]),
    PuppeteerModule,
  ],
  providers: [SteamService, SteamReposiiory],
  exports: [SteamService],
})
export class SteamModule {}
