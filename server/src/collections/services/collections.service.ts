import { Injectable } from '@nestjs/common';
import { CollectionsRepository } from '../database/collections.repository';
import { CreateNewCollectionDto } from '../dto/create-new-collection.dto';
import { AddGameToCollectionDto } from '../dto/add-game-to-collection.dto';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly gamesService: GamesService,
  ) {}

  async createDefaultCollections(userId: string) {
    await this.collectionsRepository.createDefaultCollections(userId);
  }

  async createCollection(userId: string, createNewCollectionDto: CreateNewCollectionDto) {
    return await this.collectionsRepository.createCollection(userId, createNewCollectionDto);
  }

  async deleteCollection(userId: string, collectionId: string) {
    return await this.collectionsRepository.deleteCollection(userId, collectionId);
  }

  async addGame(userId: string, addGameToCollectionDto: AddGameToCollectionDto) {
    const game = await this.gamesService.getGameById(addGameToCollectionDto.gameId);

    return await this.collectionsRepository.addGame(game, userId, addGameToCollectionDto.collectionId);
  }

  async getCollections(userId: string) {
    return await this.collectionsRepository.getCollections(userId);
  }
}
