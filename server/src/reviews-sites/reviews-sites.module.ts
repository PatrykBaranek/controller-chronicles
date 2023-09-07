import { Module } from '@nestjs/common';
import { ReviewsSitesGamesradarModule } from './reviews-sites-gameradar/reviews-sites-gamesradar.module';
import { ReviewsSitesController } from './reviews-sites.controller';
import { ReviewsSitesEurogamerModule } from './reviews-sites-eurogamer/reviews-sites-eurogamer.module';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    ReviewsSitesGamesradarModule,
    ReviewsSitesEurogamerModule,
    GamesModule,
  ],
  controllers: [ReviewsSitesController],
})
export class ReviewsSitesModule {}
