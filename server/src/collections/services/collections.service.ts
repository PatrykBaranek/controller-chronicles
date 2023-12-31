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

  async createCollection(userId: string, createNewCollectionDto: CreateNewCollectionDto) {
    return await this.collectionsRepository.createCollection(userId, createNewCollectionDto);
  }

  async deleteCollection(userId: string, collectionId: string) {
    return await this.collectionsRepository.deleteCollection(userId, collectionId);
  }

  async addGameToCollection(gameToCollectionDto: AddGameToCollectionDto) {
    const game = await this.gamesService.getGameById(gameToCollectionDto.gameId);

    return await this.collectionsRepository.addGameToCollection(game, gameToCollectionDto.collectionId);
  }

  async deleteGameFromCollection(collectionId: string, gameId: number) {
    const game = await this.gamesService.getGameById(gameId);

    return await this.collectionsRepository.deleteGameFromCollection(game, collectionId);
  }

  async getCollections(userId: string) {
    return await this.collectionsRepository.getCollections(userId);
  }
}
