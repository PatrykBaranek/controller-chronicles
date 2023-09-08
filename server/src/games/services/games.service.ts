import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { GamesRepository } from '../games.repository';
import { RawgApiGamesService } from 'src/rawg/rawg-api/rawg-api-games/rawg-api-games.service';
import { Game } from '../models/game.schema';
import { GetGameQueryParamsDto } from '../dto/get-game-query-params.dto';
 
@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);
  constructor(
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly gamesRepository: GamesRepository,
  ) { }

  async getGames(options?: GetGameQueryParamsDto) {
    try {
      const response = await this.rawgApiGamesService.getGames(options);

      const results = response.results.map(async (game) => {
          const existingGame = await this.gamesRepository.findGame(game.id);

          if (!existingGame) {
            const gameToSave: Game = {
              _id: game.id,
              rawgGame: game,
            };

            await this.gamesRepository.saveGame(gameToSave);
          }

          return game;
        });

      response.results = await Promise.all(results);

      return response;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (gameInDb && gameInDb.rawgGame.description_raw) {
      return gameInDb;
    }

    const rawgGame = await this.rawgApiGamesService.getGameById(id);

    const gameData: Game = {
      _id: id,
      rawgGame: rawgGame,
    };

    await this.gamesRepository.updateGame(gameData._id, gameData);

    return gameData;
  }

  async getGameStoresByGameId(id: number) {
    return this.rawgApiGamesService.getGameStoresByGameId(id);
  }
}
