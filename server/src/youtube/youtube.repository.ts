import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameTrailers, GameTrailersDocument } from './models/trailers.schema';
import { GameReviews, GameReviewsDocument } from './models/reviews.schema';
import { SearchResultDto } from './dto/search-result.dto';
import { Game, GameDocument } from 'src/games/models/game.schema';

@Injectable()
export class YoutubeRepository {
  private readonly logger = new Logger(YoutubeRepository.name);

  constructor(
    @InjectModel(GameTrailers.name)
    private gameTrailersModel: Model<GameTrailersDocument>,
    @InjectModel(GameReviews.name)
    private gameReviewsModel: Model<GameReviewsDocument>,
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
  ) {}

  async saveGameVideoReviews(
    gameId: number,
    videoReviews: SearchResultDto[],
  ): Promise<GameReviews> {
    const existingReviews = await this.gameReviewsModel.findOne({
      game_id: gameId,
    });
    if (existingReviews) {
      return this.gameReviewsModel.findOneAndUpdate(
        { game_id: gameId },
        { video_reviews: videoReviews },
      );
    }

    const gameVideoReviewsToSave = new this.gameReviewsModel({
      game_id: gameId,
      video_reviews: videoReviews,
    });

    this.logger.log(`Saving video reviews for game ${gameId}`);
    await this.gameModel
      .findOneAndUpdate(
        {
          _id: gameId,
        },
        {
          video_reviews: gameVideoReviewsToSave.video_reviews,
        },
      )
      .exec();

    return gameVideoReviewsToSave.save();
  }

  async saveGameTrailers(
    gameId: number,
    trailers: SearchResultDto[],
  ): Promise<GameTrailers> {
    const gameTrailersToSave = new this.gameTrailersModel({
      game_id: gameId,
      video_trailers: trailers,
    });

    this.logger.log(`Saving trailers for game ${gameId}`);
    await this.gameModel
      .findOneAndUpdate(
        {
          _id: gameId,
        },
        {
          game_trailers: gameTrailersToSave.video_trailers,
        },
      )
      .exec();

    return gameTrailersToSave.save();
  }

  async getGameVideos(
    gameId: number,
    videoType: 'reviews' | 'trailers',
  ): Promise<GameTrailers['video_trailers'] | GameReviews['video_reviews']> {
    if (videoType === 'reviews') {
      const gameVideoReviews = await this.gameReviewsModel.findOne({
        game_id: gameId,
      });
      return gameVideoReviews ? gameVideoReviews.video_reviews : [];
    } else {
      const gameTrailers = await this.gameTrailersModel.findOne({
        game_id: gameId,
      });
      return gameTrailers ? gameTrailers.video_trailers : [];
    }
  }
}
