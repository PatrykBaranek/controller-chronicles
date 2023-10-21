import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { subDays } from 'date-fns';
import { Model } from 'mongoose';

import { Game, GameDocument } from '../models/game.schema';

import { RawgGameResponseDto } from '../../rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';

@Injectable()
export class GamesRepository {
  private readonly logger = new Logger(GamesRepository.name);

  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async saveGames(games: RawgGameResponseDto[]) {
    const bulkOperations = games.map(game => ({
      updateOne: {
        filter: { "_id": game.id },
        update: { $set: { rawgGame: game } },
        upsert: true,
      },
    }));

    await this.gameModel.bulkWrite(bulkOperations);
  }

  async saveGame(game: Game): Promise<Game> {
    const gameToSave = new this.gameModel(game);
    return gameToSave.save();
  }

  async updateGame(gameId: number, updateGame: Partial<Game>) {
    await this.gameModel.updateOne({ _id: gameId }, updateGame);
  }

  async updateGames(gamesToUpdate: Game[]) {
    try {
      const games = this.filterEmptyGameProperties(gamesToUpdate);
      
      const updateOperations = games.map(game => ({
        updateMany: {
          filter: { _id: game._id },
          update: { $set: { ...game } },
        }
      }));
      
      await this.gameModel.bulkWrite(updateOperations);
    } catch(err) {
      this.logger.error('Error updating games:', err);
    }
  }

  async getRecentGames(): Promise<Game[]> {
    const oneWeekAgo = subDays(new Date(), 7);

    // We can get only 10 games per due to rate limits youtube api
    const games = await this.gameModel.find({
      updatedAt: { $gte: oneWeekAgo },
    }).limit(10);

    return games;
  }

  async getGamesAddedLastHour(): Promise<Game[]> {
    const lastHour = new Date();

    lastHour.setHours(lastHour.getHours() - 1);
    const games = this.gameModel.find({
      createdAt: { $gte: lastHour },
    });

    return games;
  }

  async getAllGamesWithoutDescription(): Promise<Game[]> {
    // Find games with a null or empty description
    const games = this.gameModel.find({
      $or: [
        { 'rawgGame.description_raw': { $eq: null } },
        { 'rawgGame.description_raw': { $eq: "" } }
      ]
    });

    return games;
  }

  async findGame(gameId: number): Promise<Game> {
    const game = this.gameModel.findOne({
      _id: gameId,
    });

    return game;
  }

  async findGames(gameIds: number[]): Promise<Game[]> {
    return await this.gameModel.find({ _id: { $in: gameIds } }).exec();
  }

  // Remove games with null or empty properties helper function
  private filterEmptyGameProperties(games: Game[]): Game[] {
    return games.map(game => {
      Object.keys(game).forEach(key => {
        if (game[key] == null || game[key] === "" || game[key] === undefined) {
          delete game[key];
        }
      });
      return game;
    });
  }
}
