import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Model } from 'mongoose';
import { CollectionDocument } from './models/collection.model';
import { Game } from 'src/games/models/game.schema';
import { CreateNewCollectionDto } from './dto/create-new-collection.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';

const MAX_COLLECTIONS = 5;
const DEFAULT_COLLECTIONS = ['My Collection', 'Followed Games'];

@Injectable()
export class CollectionsRepository {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<CollectionDocument>,
  ) {}

  async createDefaultCollections(userId: string) {
    for (const name of DEFAULT_COLLECTIONS) {
      await this.createCollection(userId, { name, priority: 0 });
    }
  }

  async addGame(game: Game, userId: string, collectionId: string) {
    const collection = await this.collectionModel.findOne({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.games.find((g) => g._id === game._id)) {
      throw new BadRequestException('Game already exists in this collection');
    }

    collection.games.push(game);

    return collection.save();
  }

  async createCollection(
    userId: string,
    createNewCollectionDto: CreateNewCollectionDto,
  ) {
    try {
      const userCollections = await this.findAllCollectionsByUserId(userId);

      if (userCollections.length >= MAX_COLLECTIONS) {
        throw new BadRequestException(
          'You cannot create more than 5 collections',
        );
      }

      if (userCollections.find((c) => c.name === createNewCollectionDto.name)) {
        throw new BadRequestException(
          'You cannot create a collection with the same name',
        );
      }

      const newCollection = new this.collectionModel({
        userId,
        games: [],
        ...createNewCollectionDto,
      });
      return newCollection.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteCollection(deleteCollectionDto: DeleteCollectionDto) {
    const collectionToDelete = await this.collectionModel.findById({
      _id: deleteCollectionDto.collectionId,
    });

    if (DEFAULT_COLLECTIONS.includes(collectionToDelete.name)) {
      throw new ForbiddenException('You cannot delete this collection');
    }

    return collectionToDelete.deleteOne();
  }

  async getCollections(userId: string) {
    const collections = await this.findAllCollectionsByUserId(userId);

    if (collections.length === 0) {
      throw new NotFoundException("You don't have any collections");
    }

    return collections;
  }

  private findAllCollectionsByUserId(userId: string) {
    return this.collectionModel.find({ userId }, { __v: 0, userId: 0 });
  }
}
