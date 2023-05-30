import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Model } from 'mongoose';
import { CollectionDocument } from './models/collection.model';
import { Game } from 'src/rawg/rawg-games/models/game.schema';

@Injectable()
export class CollectionsRepository {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<CollectionDocument>,
  ) {}

  async addGame(game: Game, userId: string) {
    const collection = await this.collectionModel.findOne({ userId });
    if (collection) {
      collection.games.push(game);
      return collection.save();
    } else {
      const newCollection = new this.collectionModel({
        userId,
        games: [game],
      });
      return newCollection.save();
    }
  }
}
