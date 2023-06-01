import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './models/game.schema';
import { Model } from 'mongoose';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';

@Injectable()
export class RawgGamesRepository {
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

  async findGame(gameId: number): Promise<Game> {
    const game = this.gameModel.findOne({
      _id: gameId,
    });

    return game;
  }
}
