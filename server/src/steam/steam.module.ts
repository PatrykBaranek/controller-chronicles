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
import {
  SteamReviews,
  SteamReviewsSchema,
} from './models/steam-reviews.schema';
import { Game, GameSchema } from 'src/games/models/game.schema';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SteamBestSellers.name, schema: SteamBestSellersSchema },
      { name: SteamReviews.name, schema: SteamReviewsSchema },
      { name: Game.name, schema: GameSchema },
    ]),
    forwardRef(() => GamesModule),
    PuppeteerModule,
  ],
  providers: [SteamBestSellersService, SteamReposiiory, SteamReviewsService],
  exports: [SteamBestSellersService, SteamReviewsService],
})
export class SteamModule {}
