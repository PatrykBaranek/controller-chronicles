import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarModule } from './reviews-sites-gameradar/reviews-sites-gameradar.module';
import { ReviewsSitesController } from './reviews-sites.controller';
import { ReviewsSitesEurogamerModule } from './reviews-sites-eurogamer/reviews-sites-eurogamer.module';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    ReviewsSitesGameradarModule,
    ReviewsSitesEurogamerModule,
    GamesModule,
  ],
  controllers: [ReviewsSitesController],
})
export class ReviewsSitesModule {}
