import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameUpdate, GameUpdateSchema } from './models/game-update.schema';
import { GamesModule } from 'src/games/games.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { SteamModule } from 'src/steam/steam.module';
import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';
import { GamesUpdateService } from './services/games-update.service';
import { GamesUpdateRepository } from './games-update.repository';
import { ReviewsSitesModule } from 'src/reviews-sites/reviews-sites.module';
import { RawgApiModule } from 'src/rawg/rawg-api/rawg-api.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GameUpdate.name, schema: GameUpdateSchema },
    ]),
    forwardRef(() => GamesModule),
    YoutubeModule,
    SteamModule,
    HowLongToBeatModule,
    ReviewsSitesModule,
    RawgApiModule,
  ],
  providers: [GamesUpdateService, GamesUpdateRepository],
})
export class GamesUpdateModule {}