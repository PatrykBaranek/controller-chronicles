import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { RawgGameResponse } from './types/rawg-game-response';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { plainToInstance } from 'class-transformer';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';
import { HowLongToBeatService } from 'howlongtobeat';
import { HowLongToBeatResponseDto } from './dto/how-long-to-beat-response.dto';
import { GetGameStoresResponse } from './types/rawg-game-stores-response';
import { GetStoresResponse } from './types/rawg-stores-response';
import { GamesRepository } from './games.repository';
import { AxiosResponse } from 'axios';
import { Game } from './models/Game.schema';

@Injectable()
export class GamesService {
  private readonly rawgApiUrl = 'https://api.rawg.io/api/games';
  private readonly hltbService: HowLongToBeatService;

  constructor(
    private readonly httpService: HttpService,
    private readonly gamesRepository: GamesRepository,
  ) {
    this.hltbService = new HowLongToBeatService();
  }

  async getGames(options?: GetGameQueryParamsDto) {
    const { page, page_size, stores, metacritic, ordering, search } = options;

    const paramsObject: Record<string, string> = {
      key: process.env.RAWG_API_KEY,
      ...(page && { page: page.toString() }),
      ...(page_size && { page_size: page_size.toString() }),
      ...(stores && { stores }),
      ...(metacritic && { metacritic: metacritic.toString() }),
      ...(ordering && { ordering: ordering.toString() }),
      ...(search && { search }),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `${this.rawgApiUrl}?${httpParams.toString()}`;

    try {
      const response: AxiosResponse = await this.httpService.axiosRef.get(url);

      const totalPages = Math.ceil(response.data.count / page_size);

      if (page > totalPages) {
        throw new NotFoundException(
          'Page number cannot be greater than page size',
        );
      }

      const games = response.data.results as RawgGameResponse[];

      await Promise.all(
        games.map(async (game) => {
          const gameData: Partial<Game> = {
            game_id: game.id,
            rawgGame: game,
          };
          await this.gamesRepository.saveGame(plainToInstance(Game, gameData));
        }),
      );

      return {
        totalItems: response.data.count,
        totalPages,
        currentPage: page,
        results: plainToInstance(RawgGameResponseDto, games),
      };
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }

  async getGameById(id: number) {
    const gameInDb = await this.gamesRepository.findGame(id);

    if (gameInDb.rawgGame && gameInDb.howLongToBeat) {
      return {
        game_id: gameInDb.game_id,
        rawgGame: gameInDb.rawgGame,
        howLongToBeat: gameInDb.howLongToBeat,
      };
    }

    const rawgGame = await this.httpService.axiosRef
      .get<RawgGameResponse>(
        `${this.rawgApiUrl}/${id}?key=${process.env.RAWG_API_KEY}`,
      )
      .then((response) => response.data);

    const hltbGame = await this.hltbService.search(rawgGame.name);

    await this.gamesRepository.saveGame({
      game_id: rawgGame.id,
      rawgGame: {
        ...plainToInstance(RawgGameResponseDto, rawgGame),
      },
      howLongToBeat: {
        gameplayMain: hltbGame[0]?.gameplayMain,
        gameplayMainExtra: hltbGame[0]?.gameplayMainExtra,
        gameplayCompletionist: hltbGame[0]?.gameplayCompletionist,
      },
    });

    return {
      rawgGame: plainToInstance(RawgGameResponseDto, rawgGame),
      howLongToBeat: plainToInstance(HowLongToBeatResponseDto, hltbGame[0]),
      game_id: rawgGame.id,
    };
  }

  async getGameTrailersById(id: number) {
    const rawgGameTrailers = await this.httpService.axiosRef.get(
      `${this.rawgApiUrl}/${id}/movies?key=${process.env.RAWG_API_KEY}`,
    );

    return rawgGameTrailers.data;
  }

  async getGameStoresByGameId(id: number) {
    const gameStores =
      await this.httpService.axiosRef.get<GetGameStoresResponse>(
        `${this.rawgApiUrl}/${id}/stores?key=${process.env.RAWG_API_KEY}`,
      );

    const stores = await this.httpService.axiosRef.get<GetStoresResponse>(
      `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`,
    );

    const result = gameStores.data.results.map((store) => {
      return {
        id: store.id,
        name: stores.data.results.find((s) => s.id === store.store_id).name,
        url: store.url,
      };
    });

    return result;
  }
}
