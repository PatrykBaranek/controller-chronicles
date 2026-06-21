import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { GamesRepository } from '../../games/database/games.repository';
import { Game } from '../../games/models/game.schema';

import {
  UpdateStrategyFactory,
  UpdateStrategyType,
} from './strategies/update-strategy-factory';
import { IgdbGameResponseDto } from 'src/igdb/igdb-api/igdb-api-games/dto/igdb-game-response.dto';
import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';

@Injectable()
export class GamesUpdateService {
  private readonly logger = new Logger(GamesUpdateService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly updateStrategyFactory: UpdateStrategyFactory,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async updateGames() {
    this.logger.log('Scheduled update of games in db');
    const gamesInDb = await this.gamesRepository.getRecentGames();

    const updatedGames = await Promise.all(
      gamesInDb.map((game) => this.updateGame(game)),
    );

    await this.gamesRepository.updateGames(updatedGames);
  }

  async updateGame(game: Game): Promise<Game> {
    const updatedIgdb = await this.updateIgdbGame(game);
    const updatedHltb = await this.updateHowLongToBeat(game);

    game.igdbGame = updatedIgdb;
    game.howLongToBeat = updatedHltb;

    await this.gamesRepository.updateGame(game._id, game);

    return game;
  }

  private async updateIgdbGame(game: Game) {
    const igdbApiGamesService = this.updateStrategyFactory.createUpdateStrategy(
      UpdateStrategyType.IGDB,
    );

    return (await igdbApiGamesService.update(game)) as IgdbGameResponseDto;
  }

  private async updateHowLongToBeat(game: Game): Promise<HowLongToBeat> {
    const howLongToBeat = this.updateStrategyFactory.createUpdateStrategy(
      UpdateStrategyType.HLTB,
    );

    return (await howLongToBeat.update(game)) as HowLongToBeat;
  }
}
