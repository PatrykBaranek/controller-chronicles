import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeService } from './services/youtube.service';
import { Game, GameSchema } from 'src/games/models/game.schema';
import { GameReviews, GameReviewsSchema } from './models/reviews.schema';
import { GameTrailers, GameTrailersSchema } from './models/trailers.schema';
import { YoutubeRepository } from './youtube.repository';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GameTrailers.name, schema: GameTrailersSchema },
      { name: GameReviews.name, schema: GameReviewsSchema },
      { name: Game.name, schema: GameSchema },
    ]),
    forwardRef(() => GamesModule)
  ],
  providers: [YoutubeService, YoutubeRepository],
  exports: [YoutubeService],
})
export class YoutubeModule {}
