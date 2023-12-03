import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';
import { GamesModule } from 'src/games/games.module';

import { Game, GameSchema } from 'src/games/models/game.schema';

import { SteamBestSellersService } from './services/steam-bestsellers/steam-bestsellers.service';
import { SteamBestSellers, SteamBestSellersSchema } from './models/steam-bestsellers.schema';

import { SteamReviewsService } from './services/steam-reviews/steam-reviews.service';
import { SteamReviews, SteamReviewsSchema } from './models/steam-reviews.schema';

import { SteamPlayersInGameService } from './services/steam-players-in-game/steam-players-in-game.service';
import { SteamPlayersInGameSchema } from './models/steam-players-in-game.schema';

import { SteamRepository } from './database/steam.repository';
import { SteamUtilityService } from './util/steam-utility.service';
import { SteamController } from './controllers/steam.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SteamBestSellers.name, schema: SteamBestSellersSchema },
      { name: SteamReviews.name, schema: SteamReviewsSchema },
      { name: SteamPlayersInGameService.name, schema: SteamPlayersInGameSchema },
      { name: Game.name, schema: GameSchema },
    ]),
    forwardRef(() => GamesModule),
    PuppeteerModule,
  ],
  providers: [
    SteamBestSellersService,
    SteamReviewsService,
    SteamPlayersInGameService,
    SteamRepository,
    SteamUtilityService
  ],
  exports: [
    SteamBestSellersService, 
    SteamReviewsService, 
    SteamPlayersInGameService,
    SteamUtilityService,
  ],
  controllers: [SteamController],
})
export class SteamModule {}
