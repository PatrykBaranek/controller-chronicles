import { Module, forwardRef } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/Game.schema';
import { GamesRepository } from './games.repository';
import {
  GameTrailers,
  GameTrailersSchema,
} from './youtube/models/trailers.schema';
import { YoutubeModule } from './youtube/youtube.module';

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
  providers: [GamesService, GamesRepository],
  exports: [GamesService],
})
export class GamesModule {}
