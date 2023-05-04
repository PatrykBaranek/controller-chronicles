import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './models/Game.schema';
import { Model } from 'mongoose';

@Injectable()
export class GamesRepository {
  private readonly logger = new Logger(GamesRepository.name);

  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async saveGame(game: Game): Promise<Game> {
    const gameToSave = new this.gameModel(game);
    return gameToSave.save();
  }

  async findGame(gameId: number): Promise<Game> {
    const game = this.gameModel.findOne({
      game_id: gameId,
    });

    this.logger.log(`Game found in database: ${gameId}`);

    return game;
  }
}
