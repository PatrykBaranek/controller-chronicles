import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SteamBestSellers, SteamBestSellersDocument } from './models/steam-bestsellers.schema';
import { SteamReviews, SteamReviewsDocument} from './models/steam-reviews.schema';
import { Game, GameDocument } from 'src/games/models/game.schema';
import { SteamPlayersInGame } from './models/steam-players-in-game.schema';

@Injectable()
export class SteamRepository {
  constructor(
    @InjectModel(SteamBestSellers.name)
    private steamBestSellerModel: Model<SteamBestSellersDocument>,
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
  ) {}

  async saveBestSellers(bestSellers: Partial<SteamBestSellers>) {
    await this.steamBestSellerModel.deleteMany({});

    const bestSellersToSave = new this.steamBestSellerModel({
      ...bestSellers,
    });
    await bestSellersToSave.save();
  }

  async saveReviews(reviews: SteamReviews) {
    const game = await this.gameModel.findOne({
      _id: reviews.game_id,
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    game.steam_reviews = reviews;
    await game.save();
  }

  async getBestSellers(): Promise<SteamBestSellers> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bestSellersFromDb = await this.steamBestSellerModel.find(
        {
          updatedAt: {
            $gte: start,
            $lte: end,
          },
        },
      ).sort({ updatedAt: -1 });


    return bestSellersFromDb[0];
  }
}
