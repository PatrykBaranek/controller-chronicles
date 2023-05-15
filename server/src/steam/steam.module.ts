import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SteamBestSellers,
  SteamBestSellersSchema,
} from './models/steam-bestsellers.schema';
import { SteamBestSellersService } from './steam-bestsellers/steam-bestsellers.service';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';
import { SteamReposiiory } from './steam.repository';
import { SteamReviewsService } from './steam-reviews/steam-reviews.service';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';
import {
  SteamReviews,
  SteamReviewsSchema,
} from './models/steam-reviews.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SteamBestSellers.name, schema: SteamBestSellersSchema },
      { name: SteamReviews.name, schema: SteamReviewsSchema },
    ]),
    forwardRef(() => RawgGamesModule),
    PuppeteerModule,
  ],
  providers: [SteamBestSellersService, SteamReposiiory, SteamReviewsService],
  exports: [SteamBestSellersService, SteamReviewsService],
})
export class SteamModule {}
