import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { subDays }     from 'date-fns';
import { Model }       from 'mongoose';

import { Game, GameDocument } from '../models/game.schema';

import { RawgGameResponseDto } from '../../rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';

@Injectable()
export class GamesRepository {

  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async saveGames(games: RawgGameResponseDto[]) {
    const bulkOperations = games.map(game => ({
      updateOne: {
        filter: { _id: game.id },
        update: { $set: { rawgGame: game } },
        upsert: true,
      },
    }));

    await this.gameModel.bulkWrite(bulkOperations);
  }

  async updateGame(gameId: number, updateGame: Partial<Game>) {
    await this.gameModel.updateOne({ _id: gameId }, updateGame);
  }

  async updateGames(gamesToUpdate: Game[]) {
    const games = this.filterEmptyGameProperties(gamesToUpdate);
      
    const updateOperations = games.map(game => ({
      updateOne: {
        filter: { _id: game._id },
        update: { $set: game },
      }
    }));
      
    await this.gameModel.bulkWrite(updateOperations);
  }

  async getRecentGames(): Promise<Game[]> {
    const sevenDaysAgo = subDays(new Date(), 7);

    // We can get only 10 games per due to rate limits youtube api
    const games = await this.gameModel.find({
      updatedAt: { $lt: sevenDaysAgo },
    }).limit(10);

    return games;
  }

  async findGame(gameId: number): Promise<Game> {
    const game = this.gameModel.findOne({ _id: gameId });

    return game;
  }

  async findGames(gameIds: number[]): Promise<Game[]> {
    return await this.gameModel.find({ _id: { $in: gameIds } });
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
