import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { RawgGamesRepository } from './rawg-games.repository';
import { plainToInstance } from 'class-transformer';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';
import { HowLongToBeatService } from 'src/how-long-to-beat/how-long-to-beat.service';
import { RawgApiGamesService } from '../rawg-api/rawg-api-games/rawg-api-games.service';
import { Game } from './models/game.schema';
import { format, subMonths } from 'date-fns';
import { PageQueryParamsDto } from './dto/page-query-params.dto';

@Injectable()
export class RawgGamesService {
  constructor(
    private readonly gamesRepository: RawgGamesRepository,
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly hltbService: HowLongToBeatService,
  ) {}

  async getGames(options?: GetGameQueryParamsDto) {
    try {
      const response = await this.rawgApiGamesService.getGames(options);

      response.results = await Promise.all(
        response.results.map(async (game) => {
          const existingGame = await this.gamesRepository.findGame(game.id);

          if (!existingGame) {
            const gameToSave: Game = {
              _id: game.id,
              rawgGame: game,
              howLongToBeat: null,
            };

            await this.gamesRepository.saveGame(gameToSave);
          }

          return game;
        }),
      );

      return response;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (gameInDb.rawgGame && gameInDb.howLongToBeat) {
      return gameInDb;
    }

    const rawgGame = await this.rawgApiGamesService.getGameById(id);
    const hltbGame = await this.hltbService.getGameByName(rawgGame.name);

    const gameData: Game = {
      _id: gameInDb._id,
      rawgGame: plainToInstance(RawgGameResponseDto, rawgGame),
      howLongToBeat: hltbGame,
    };

    if (gameInDb) {
      await this.gamesRepository.updateGame(gameInDb._id, gameData);
    } else {
      await this.gamesRepository.saveGame(gameData);
    }

    return gameData;
  }

  async getGameStoresByGameId(id: number) {
    return this.rawgApiGamesService.getGameStoresByGameId(id);
  }

  async getNewReleases(pageParams: PageQueryParamsDto) {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const oneMonthAgo = format(subMonths(new Date(), 1), 'yyyy-MM-dd');

    return this.rawgApiGamesService.getGames({
      ...pageParams,
      dates: `${oneMonthAgo},${currentDate}`,
    });
  }
}
