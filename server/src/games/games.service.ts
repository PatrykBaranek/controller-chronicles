import { HttpException, Injectable } from '@nestjs/common';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { GamesRepository } from './games.repository';
import { RawgApiService } from './rawg-api/rawg-api.service';
import { HowLongToBeatService } from './how-long-to-beat/how-long-to-beat.service';
import { Game } from './models/game.schema';
import { plainToInstance } from 'class-transformer';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly rawgApiService: RawgApiService,
    private readonly hltbService: HowLongToBeatService,
  ) {}

  async getGames(options?: GetGameQueryParamsDto) {
    try {
      const response = await this.rawgApiService.getGames(options);

      await this.gamesRepository.saveGames(response.results);

      return response;
    } catch (err) {
      throw new HttpException(err.response.data, err.response.status);
    }
  }

  async getGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (gameInDb.rawgGame && gameInDb.howLongToBeat) {
      return gameInDb;
    }

    const rawgGame = await this.rawgApiService.getGameById(id);
    const hltbGame = await this.hltbService.getGameByName(rawgGame.name);

    const gameData: Game = {
      game_id: rawgGame.id,
      rawgGame: plainToInstance(RawgGameResponseDto, rawgGame),
      howLongToBeat: hltbGame,
    };

    if (gameInDb) {
      await this.gamesRepository.updateGame(gameData.game_id, gameData);
    } else {
      await this.gamesRepository.saveGame(gameData);
    }

    return gameData;
  }

  async getGameStoresByGameId(id: number) {
    return this.rawgApiService.getGameStoresByGameId(id);
  }
}
