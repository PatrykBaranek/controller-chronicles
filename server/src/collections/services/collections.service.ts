import { HttpException, Injectable } from '@nestjs/common';
import { CollectionsRepository } from '../database/collections.repository';
import { CreateNewCollectionDto } from '../dto/create-new-collection.dto';
import { DeleteCollectionDto } from '../dto/delete-collection.dto';
import { AddGameToCollectionDto } from '../dto/add-game-to-collection.dto';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly gamesService: GamesService,
  ) {}

  async createDefaultCollections(userId: string) {
    return await this.collectionsRepository.createDefaultCollections(userId);
  }

  async createCollection(
    userId: string,
    createNewCollectionDto: CreateNewCollectionDto,
  ) {
    try {
      return await this.collectionsRepository.createCollection(
        userId,
        createNewCollectionDto,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteCollection(deleteCollectionDto: DeleteCollectionDto) {
    try {
      return await this.collectionsRepository.deleteCollection(
        deleteCollectionDto,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async addGame(
    addGameToCollectionDto: AddGameToCollectionDto,
    userId: string,
  ) {
    try {
      const game = await this.gamesService.getGameById(
        addGameToCollectionDto.gameId,
      );

      return await this.collectionsRepository.addGame(
        game,
        userId,
        addGameToCollectionDto.collectionId,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCollections(userId: string) {
    try {
      return await this.collectionsRepository.getCollections(userId);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
