import { Module, forwardRef } from '@nestjs/common';

import { GamesModule } from 'src/games/games.module';
import { HowLongToBeatModule } from 'src/how-long-to-beat/how-long-to-beat.module';
import { GamesUpdateService } from './services/games-update.service';
import { ReviewsSitesModule } from 'src/reviews-sites/reviews-sites.module';
import { RawgApiModule } from 'src/rawg/rawg-api/rawg-api.module';
import { UpdateStrategyFactory } from './services/strategies/update-strategy-factory';

@Module({
  imports: [
    forwardRef(() => GamesModule),
    HowLongToBeatModule,
    ReviewsSitesModule,
    RawgApiModule,
  ],
  providers: [GamesUpdateService, UpdateStrategyFactory],
  exports: [GamesUpdateService]
})
export class GamesUpdateModule {}