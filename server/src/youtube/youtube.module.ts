import { Module, forwardRef } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeRepository } from './youtube.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { GameTrailers, GameTrailersSchema } from './models/trailers.schema';
import { GameReviews, GameReviewsSchema } from './models/reviews.schema';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GameTrailers.name, schema: GameTrailersSchema },
      { name: GameReviews.name, schema: GameReviewsSchema },
    ]),
    forwardRef(() => RawgGamesModule),
  ],
  providers: [YoutubeService, YoutubeRepository],
  exports: [YoutubeService],
})
export class YoutubeModule {}
