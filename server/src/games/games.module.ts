import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule }     from '@nestjs/schedule';
import { MongooseModule }     from '@nestjs/mongoose';

import { GamesController }       from './games.controller';
import { GamesService }          from './services/games.service';
import { GamesRepository }       from './games.repository';
import { Game, GameSchema }      from './models/game.schema';
import { GamesUpdateService }    from './services/games-update.service';
import { GamesUpdateController } from './games-update.controller';

import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';

import { RawgApiModule } from 'src/rawg/rawg-api/rawg-api.module';

import { SteamModule } from 'src/steam/steam.module';

import { YoutubeModule } from 'src/youtube/youtube.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    forwardRef(() => YoutubeModule),
    forwardRef(() => SteamModule),
    HowLongToBeatModule,
    RawgApiModule,
  ],
  controllers: [GamesController, GamesUpdateController],
  providers: [GamesService, GamesRepository, GamesUpdateService],
  exports: [GamesService],
})
export class GamesModule { }
