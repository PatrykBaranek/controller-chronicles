import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SteamBestSellers } from './models/steam-bestsellers.model';
import { Model } from 'mongoose';

@Injectable()
export class SteamReposiiory {
  constructor(
    @InjectModel(SteamBestSellers.name)
    private steamBestSellerModel: Model<SteamBestSellers>,
  ) {}

  async saveBestSellers(bestSellers: SteamBestSellers) {
    await this.steamBestSellerModel.deleteMany({});

    const bestSellersToSave = new this.steamBestSellerModel({
      ...bestSellers,
      updateDate: Date.now(),
    });
    await bestSellersToSave.save();
  }

  async getBestSellers() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bestSellers = await this.steamBestSellerModel
      .find({
        updateDate: {
          $gte: start,
          $lte: end,
        },
      })
      .sort({ updateDate: -1 });

    return bestSellers;
  }
}
