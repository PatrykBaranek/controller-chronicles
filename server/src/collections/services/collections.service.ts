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
    console.log(userId);
    return await this.collectionsRepository.createDefaultCollections(userId);
  }

  async createCollection(userId: string, createNewCollectionDto: CreateNewCollectionDto) {
    console.log(userId);
    return await this.collectionsRepository.createCollection(userId, createNewCollectionDto);
  }

  async deleteCollection(deleteCollectionDto: DeleteCollectionDto) {
    return await this.collectionsRepository.deleteCollection(deleteCollectionDto);
  }

  async addGame(userId: string, addGameToCollectionDto: AddGameToCollectionDto) {
    const game = await this.gamesService.getGameById(addGameToCollectionDto.gameId);

    return await this.collectionsRepository.addGame(game, userId, addGameToCollectionDto.collectionId);
  }

  async getCollections(userId: string) {
    console.log(userId);
    return await this.collectionsRepository.getCollections(userId);
  }
}
