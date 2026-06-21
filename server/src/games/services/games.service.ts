import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { differenceInDays } from 'date-fns';

import { GamesRepository } from '../database/games.repository';
import { IgdbApiGamesService } from 'src/igdb/igdb-api/igdb-api-games/igdb-api-games.service';
import { GetGameQueryParamsDto } from '../dto/get-game-query-params.dto';
import { IgdbGameResponseDto } from 'src/igdb/igdb-api/igdb-api-games/dto/igdb-game-response.dto';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { GamesUpdateService } from 'src/games-update/services/games-update.service';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);
  constructor(
    @Inject(forwardRef(() => GamesUpdateService))
    private readonly gamesUpdateService: GamesUpdateService,
    private readonly igdbApiGamesService: IgdbApiGamesService,
    private readonly gamesRepository: GamesRepository,
  ) {}

  async getGames(options?: GetGameQueryParamsDto): Promise<PaginationDto<IgdbGameResponseDto>> {
    const response = await this.igdbApiGamesService.getGames(options);

    const gameIds = response.results.map((game) => game.id);

    const existingGames = await this.gamesRepository.findGames(gameIds);

    const newGames = response.results.filter((game) => !existingGames.some((existingGame) => existingGame._id === game.id));

    if (newGames.length > 0) {
      this.logger.log(`Saving ${newGames.length} new games in the database`);
      await this.gamesRepository.saveGames(newGames);
    }

    return response;
  }

  async getGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (!gameInDb) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

    if (differenceInDays(new Date(), new Date(gameInDb.updatedAt ?? new Date())) < 7) {
      this.logger.log(`Game with id ${id} found in db and don't need to be updated`);
      return gameInDb;
    }

    const game = await this.gamesUpdateService.updateGame(gameInDb);

    return game;
  }

  async forceUpdateGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (!gameInDb) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

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
}
