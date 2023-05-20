import { Module } from '@nestjs/common';
import { ReviewsSitesGameradarModule } from './reviews-sites-gameradar/reviews-sites-gameradar.module';
import { ReviewsSitesGramPlModule } from './reviews-sites-gram-pl/reviews-sites-gram-pl.module';
import { ReviewsSitesGryOnlineModule } from './reviews-sites-gry-online/reviews-sites-gry-online.module';
import { ReviewsSitesIgnModule } from './reviews-sites-ign/reviews-sites-ign.module';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';

@Module({
  imports: [
    ReviewsSitesGameradarModule,
    ReviewsSitesGramPlModule,
    ReviewsSitesGryOnlineModule,
    ReviewsSitesIgnModule,
    RawgGamesModule,
  ],
})
export class ReviewsSitesModule {}
