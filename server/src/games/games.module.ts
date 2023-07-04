import { Module, forwardRef } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SteamModule } from 'src/steam/steam.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';
import { RawgApiModule } from 'src/rawg/rawg-api/rawg-api.module';
import { GamesRepository } from './games.repository';
import { Game, GameSchema } from './models/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    forwardRef(() => YoutubeModule),
    forwardRef(() => SteamModule),
    HowLongToBeatModule,
    RawgApiModule,
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesService],
})
export class GamesModule {}
