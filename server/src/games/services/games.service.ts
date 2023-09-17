import { Injectable, Logger } from '@nestjs/common';
import { GamesRepository } from '../games.repository';
import { RawgApiGamesService } from 'src/rawg/rawg-api/rawg-api-games/rawg-api-games.service';
import { Game } from '../models/game.schema';
import { GetGameQueryParamsDto } from '../dto/get-game-query-params.dto';
import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';
import { PaginationDto } from 'src/rawg/helpers/dto/pagination.dto';

@Injectable()
export class GamesService {

  private readonly logger = new Logger(GamesService.name);
  constructor(
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly gamesRepository: GamesRepository,
  ) { }

  async getGames(options?: GetGameQueryParamsDto): Promise<PaginationDto<RawgGameResponseDto>> {
    const response = await this.rawgApiGamesService.getGames(options);

    // Step 1: Prepare a list of game IDs
    const gameIds = response.results.map(game => game.id);

    // Step 2: Find existing games in bulk
    const existingGames = await this.gamesRepository.findGames(gameIds);

    // Step 3: Filter out the games that are already in the database
    const newGames = response.results.filter(game => !existingGames.some(existingGame => existingGame._id === game.id));

    // Step 4: Prepare the games to be saved in the database
    const gamesToSave = newGames.map(game => ({
      _id: game.id,
      rawgGame: game,
    }));

    // Step 5: Save the new games in the database in bulk
    if (gamesToSave.length > 0) {
      this.logger.log(`Saving ${gamesToSave.length} new games in the database`);
      await this.gamesRepository.saveGames(gamesToSave.map(game => game.rawgGame));
    }

    return response;
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

  async setGameReviewEmbargoDate(id: number, embargoDate: Date) {
    const game = await this.gamesRepository.findGame(id);

    if (!game) {
      throw new Error(`Game with id ${id} not found`);
    }

    game.review_embargo_date = embargoDate;

    await this.gamesRepository.updateGame(id, game);

    return game;
  }

  async getGameStoresByGameId(id: number) {
    return this.rawgApiGamesService.getGameStoresByGameId(id);
  }
}
