import { Module, forwardRef } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.schema';
import { GamesRepository } from './games.repository';
import {
  GameTrailers,
  GameTrailersSchema,
} from './youtube/models/trailers.schema';
import { YoutubeModule } from './youtube/youtube.module';
import { RawgApiService } from './rawg-api/rawg-api.service';
import { HowLongToBeatService } from './how-long-to-beat/how-long-to-beat.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: GameTrailers.name, schema: GameTrailersSchema },
    ]),
    forwardRef(() => YoutubeModule),
  ],
  controllers: [GamesController],
  providers: [
    GamesService,
    GamesRepository,
    RawgApiService,
    HowLongToBeatService,
  ],
  exports: [GamesService],
})
export class GamesModule {}
