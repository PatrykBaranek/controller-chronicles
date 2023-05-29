import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarModule } from './reviews-sites-gameradar/reviews-sites-gameradar.module';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';
import { ReviewsSitesController } from './reviews-sites.controller';
import { ReviewsSitesEurogamerModule } from './reviews-sites-eurogamer/reviews-sites-eurogamer.module';

@Module({
  imports: [ReviewsSitesGameradarModule, RawgGamesModule, ReviewsSitesEurogamerModule],
  controllers: [ReviewsSitesController],
})
export class ReviewsSitesModule {}
