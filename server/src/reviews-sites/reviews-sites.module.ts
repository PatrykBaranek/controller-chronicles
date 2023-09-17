import { Module, forwardRef } from '@nestjs/common';

import { ReviewsSitesEurogamerModule } from './reviews-sites-eurogamer/reviews-sites-eurogamer.module';
import { ReviewsSitesGamesradarModule } from './reviews-sites-gamesradar/reviews-sites-gamesradar.module';
import { ReviewsSitesService } from './reviews-sites.service';

import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    ReviewsSitesGamesradarModule,
    ReviewsSitesEurogamerModule,
    forwardRef(() => GamesModule),
  ],
  providers: [ReviewsSitesService],
  exports: [ReviewsSitesService]
})
export class ReviewsSitesModule {}
