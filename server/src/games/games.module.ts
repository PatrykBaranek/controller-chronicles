import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './controllers/games.controller';
import { GamesService } from './services/games.service';
import { GamesRepository } from './database/games.repository';
import { Game, GameSchema } from './models/game.schema';

import { IgdbApiModule } from 'src/igdb/igdb-api/igdb-api.module';

import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';
import { GamesUpdateModule } from 'src/games-update/games-update.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    forwardRef(() => GamesUpdateModule),
    HowLongToBeatModule,
    IgdbApiModule,
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
