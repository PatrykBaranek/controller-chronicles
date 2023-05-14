import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameTrailers, GameTrailersDocument } from './models/trailers.schema';
import { GameReviews, GameReviewsDocument } from './models/reviews.schema';

@Injectable()
export class YoutubeRepository {
  constructor(
    @InjectModel(GameTrailers.name)
    private gameTrailersModel: Model<GameTrailersDocument>,
    @InjectModel(GameReviews.name)
    private gameReviewsModel: Model<GameReviewsDocument>,
  ) {}

  async saveGameVideoReviews(
    gameId: number,
    videoReviews: Array<{
      title: string;
      thumbnail: string;
      author: string;
      link: string;
    }>,
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
    return gameVideoReviewsToSave.save();
  }

  async saveGameTrailers(
    gameId: number,
    trailers: Array<{
      title: string;
      thumbnail: string;
      author: string;
      link: string;
    }>,
  ): Promise<GameTrailers> {
    const gameTrailersToSave = new this.gameTrailersModel({
      game_id: gameId,
      trailers: trailers,
    });
    return gameTrailersToSave.save();
  }

  async getGameVideos(
    gameId: number,
    videoType: 'reviews' | 'trailers',
  ): Promise<
    Array<{ title: string; thumbnail: string; author: string; link: string }>
  > {
    if (videoType === 'reviews') {
      const gameVideoReviews = await this.gameReviewsModel.findOne({
        game_id: gameId,
      });
      return gameVideoReviews ? gameVideoReviews.video_reviews : [];
    } else {
      const gameTrailers = await this.gameTrailersModel.findOne({
        game_id: gameId,
      });
      return gameTrailers ? gameTrailers.trailers : [];
    }
  }
}
