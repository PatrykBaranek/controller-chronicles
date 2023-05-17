import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SteamBestSellers,
  SteamBestSellersDocument,
} from './models/steam-bestsellers.schema';
import { Model } from 'mongoose';
import {
  SteamReviews,
  SteamReviewsDocument,
} from './models/steam-reviews.schema';

@Injectable()
export class SteamReposiiory {
  constructor(
    @InjectModel(SteamBestSellers.name)
    private steamBestSellerModel: Model<SteamBestSellersDocument>,
    @InjectModel(SteamReviews.name)
    private steamReviewsModel: Model<SteamReviewsDocument>,
  ) {}

  async saveBestSellers(bestSellers: Partial<SteamBestSellers>) {
    await this.steamBestSellerModel.deleteMany({});

    const bestSellersToSave = new this.steamBestSellerModel({
      ...bestSellers,
      updateDate: new Date(),
    });
    await bestSellersToSave.save();
  }

  async saveReviews(reviews: SteamReviews) {
    if (await this.steamReviewsModel.find({ game_id: reviews.game_id })) {
      await this.steamReviewsModel.deleteOne({ game_id: reviews.game_id });
    }

    const reviewsToSave = new this.steamReviewsModel({
      ...reviews,
      updatedAt: new Date(),
    });

    await reviewsToSave.save();
  }

  async getBestSellers() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bestSellersFromDb = await this.steamBestSellerModel
      .find(
        {
          updateDate: {
            $gte: start,
            $lte: end,
          },
        },
        {
          _id: 0,
          'games._id': 0,
        },
      )
      .sort({ updateDate: -1 });

    const games = bestSellersFromDb.map((sellers) => sellers.games).flat();

    return games;
  }
}
