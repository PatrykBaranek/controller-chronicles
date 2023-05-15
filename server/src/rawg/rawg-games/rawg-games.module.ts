import { Module, forwardRef } from '@nestjs/common';
import { RawgGamesController } from './rawg-games.controller';
import { RawgGamesService } from './rawg-games.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { SteamModule } from 'src/steam/steam.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { Game, GameSchema } from './models/game.schema';
import { RawgGamesRepository } from './rawg-games.repository';
import { HowLongToBeatService } from 'src/how-long-to-beat/how-long-to-beat.service';
import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';
import { RawgApiGamesService } from '../rawg-api/rawg-api-games/rawg-api-games.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    forwardRef(() => YoutubeModule),
    forwardRef(() => SteamModule),
    PuppeteerModule,
    HowLongToBeatModule,
  ],
  controllers: [RawgGamesController],
  providers: [
    RawgGamesService,
    RawgGamesRepository,
    RawgApiGamesService,
    HowLongToBeatService,
  ],
  exports: [RawgGamesService],
})
export class RawgGamesModule {}
