import { Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common';
import { differenceInDays } from 'date-fns';

import { GamesRepository } from '../database/games.repository';
import { RawgApiGamesService } from 'src/rawg/rawg-api/rawg-api-games/rawg-api-games.service';
import { GetGameQueryParamsDto } from '../dto/get-game-query-params.dto';
import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';
import { PaginationDto } from 'src/rawg/helpers/dto/pagination.dto';
import { GamesUpdateService } from 'src/games-update/services/games-update.service';

@Injectable()
export class GamesService {

  private readonly logger = new Logger(GamesService.name);
  constructor(
    @Inject(forwardRef(() => GamesUpdateService))
    private readonly gamesUpdateService: GamesUpdateService,
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly gamesRepository: GamesRepository,
  ) { }

  async getGames(options?: GetGameQueryParamsDto): Promise<PaginationDto<RawgGameResponseDto>> {
    const response = await this.rawgApiGamesService.getGames(options);

    const gameIds = response.results.map(game => game.id);

    const existingGames = await this.gamesRepository.findGames(gameIds);

    const newGames = response.results.filter(game => !existingGames.some(existingGame => existingGame._id === game.id));

    const gamesToSave = newGames.map(game => ({
      _id: game.id,
      rawgGame: game,
    }));

    if (gamesToSave.length > 0) {
      this.logger.log(`Saving ${gamesToSave.length} new games in the database`);
      await this.gamesRepository.saveGames(gamesToSave.map(game => game.rawgGame));
    }

    return response;
  }

  async getGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (gameInDb?.rawgGame.description_raw && differenceInDays(new Date(), new Date(gameInDb?.updatedAt)) < 7) {
      this.logger.log(`Game with id ${id} found in db and don't need to be updated`);
      return gameInDb;
    }

    const game = await this.gamesUpdateService.updateGame(gameInDb);

    return game;
  }

  async forceUpdateGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    const game = await this.gamesUpdateService.updateGame(gameInDb);

    return game;
  }

  async setGameReviewEmbargoDate(id: number, embargoDate: Date) {
    const game = await this.gamesRepository.findGame(id);

    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

    game.review_embargo_date = embargoDate;

    await this.gamesRepository.updateGame(id, game);

    return game;
  }

  async getGameStoresByGameId(id: number) {
    return this.rawgApiGamesService.getGameStoresByGameId(id);
  }
}
