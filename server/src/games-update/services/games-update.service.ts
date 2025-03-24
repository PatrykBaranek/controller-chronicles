import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { GamesRepository } from '../../games/database/games.repository';
import { Game } from '../../games/models/game.schema';

import { UpdateStrategyFactory, UpdateStrategyType } from './strategies/update-strategy-factory';
import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';
import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';

@Injectable()
export class GamesUpdateService {
  private readonly logger = new Logger(GamesUpdateService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly updateStrategyFactory: UpdateStrategyFactory,
  ) { }

  @Cron(CronExpression.EVERY_12_HOURS)
  async updateGames() {
    this.logger.log('Scheduled update of games in db');
    const gamesInDb = await this.gamesRepository.getRecentGames();

    const updatedGames = await Promise.all(
      gamesInDb.map(game => this.updateGame(game))
    );

    await this.gamesRepository.updateGames(updatedGames);
  }

  async updateGame(game: Game): Promise<Game> {
    const updatedRawg = await this.updateRawgGame(game);
    // const updatedHltb = await this.updateHowLongToBeat(game);

    game.rawgGame = updatedRawg;
    // game.howLongToBeat = updatedHltb;

    await this.gamesRepository.updateGame(game._id, game);

    return game;
  }

  private async updateRawgGame(game: Game) {
    const rawgApiGamesService = this.updateStrategyFactory.createUpdateStrategy(UpdateStrategyType.RAWG);

    return await rawgApiGamesService.update(game) as RawgGameResponseDto;
  }

  private async updateHowLongToBeat(game: Game): Promise<HowLongToBeat> {
    const howLongToBeat = this.updateStrategyFactory.createUpdateStrategy(UpdateStrategyType.HLTB);

    return await howLongToBeat.update(game) as HowLongToBeat;
  }
}