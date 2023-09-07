import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { subDays } from 'date-fns';
import { Model } from 'mongoose';

import { Game, GameDocument } from './models/game.schema';
import { RawgGameResponseDto } from '../rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';

@Injectable()
export class GamesRepository {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async saveGames(games: RawgGameResponseDto[]) {
    const gamesToSave = games.map(
      (game) => new this.gameModel({ _id: game.id, rawgGame: game }),
    );
    return this.gameModel.insertMany(gamesToSave);
  }

  async saveGame(game: Game): Promise<Game> {
    const gameToSave = new this.gameModel(game);
    return gameToSave.save();
  }

  async updateGame(gameId: number, updateGame: Partial<Game>) {
    await this.gameModel.updateOne({ _id: gameId }, updateGame);
  }

  async updateGames(gamesToUpdate: Game[]) {
    const games = this.filterInvalidGameProperties(gamesToUpdate);

    const updateOperations = games.map(game => ({
      updateOne: {
        filter: { _id: game._id },
        update: { $set: {...game} },
      }
    }));

    await this.gameModel.bulkWrite(updateOperations);
  }

  async getRecentGames(): Promise<Game[]> {
    const oneWeekAgo = subDays(new Date(), 7);
  
    const games = await this.gameModel.find({
      updatedAt: { $gte: oneWeekAgo },
    }).limit(20);
  
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

  // Remove games with null or empty properties helper function
  private filterInvalidGameProperties(games: Game[]): Game[] {
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
