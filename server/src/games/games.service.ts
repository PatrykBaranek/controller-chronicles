import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { RawgApiGamesService } from 'src/rawg/rawg-api/rawg-api-games/rawg-api-games.service';
import { HowLongToBeatService } from 'src/how-long-to-beat/how-long-to-beat.service';
import { plainToInstance } from 'class-transformer';
import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';
import { Game } from './models/game.schema';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';

@Injectable()
export class GamesService {
  constructor(
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly hltbService: HowLongToBeatService,
    private readonly gamesRepository: GamesRepository,
  ) { }

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

    if (gameInDb) {
      return gameInDb;
    }

    const rawgGame = await this.rawgApiGamesService.getGameById(id);
    const hltbGame = await this.hltbService.getGameByName(rawgGame.name);

    const gameData: Game = {
      _id: id,
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
}
