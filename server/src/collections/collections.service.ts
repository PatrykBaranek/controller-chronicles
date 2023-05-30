import { HttpException, Injectable } from '@nestjs/common';
import { CollectionsRepository } from './collections.repository';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly rawgGamesService: RawgGamesService,
  ) {}

  async addGame(gameId: number, userId: string) {
    try {
      const game = await this.rawgGamesService.getGameById(gameId);

      return await this.collectionsRepository.addGame(game, userId);
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
