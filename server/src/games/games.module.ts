import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule }     from '@nestjs/mongoose';

import { GamesController }  from './games.controller';
import { GamesService }     from './services/games.service';
import { GamesRepository }  from './games.repository';
import { Game, GameSchema } from './models/game.schema';

import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';

import { RawgApiModule } from 'src/rawg/rawg-api/rawg-api.module';

import { SteamModule } from 'src/steam/steam.module';

import { YoutubeModule } from 'src/youtube/youtube.module';

import { ReviewsSitesModule } from 'src/reviews-sites/reviews-sites.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    forwardRef(() => YoutubeModule),
    forwardRef(() => SteamModule),
    ReviewsSitesModule,
    HowLongToBeatModule,
    RawgApiModule,
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesService, GamesRepository],
})
export class GamesModule { }
