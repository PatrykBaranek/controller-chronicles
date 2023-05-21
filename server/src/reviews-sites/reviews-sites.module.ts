import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarModule } from './reviews-sites-gameradar/reviews-sites-gameradar.module';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';
import { ReviewsSitesController } from './reviews-sites.controller';

@Module({
  imports: [ReviewsSitesGameradarModule, RawgGamesModule],
  controllers: [ReviewsSitesController],
})
export class ReviewsSitesModule {}
