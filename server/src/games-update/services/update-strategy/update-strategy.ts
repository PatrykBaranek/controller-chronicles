import { plainToInstance } from 'class-transformer';
import { differenceInDays } from 'date-fns';
import { Game, RawgGame } from 'src/games/models/game.schema';
import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';

import { HowLongToBeatService } from 'src/how-long-to-beat/services/how-long-to-beat.service';

import { RawgApiGamesService } from 'src/rawg/rawg-api/rawg-api-games/rawg-api-games.service';


interface UpdateStrategy<T> {
  update(game: Game): Promise<T>;
}

export class RawgUpdateStrategy implements UpdateStrategy<RawgGame> {

  constructor(private rawgApiGamesService: RawgApiGamesService) { }

  async update(game: Game): Promise<RawgGame> {
    const updatedRawgGame = await this.rawgApiGamesService.getGameById(game._id);

    updatedRawgGame.name = updatedRawgGame.name.replace(/\s*\(\d{4}\)/, '');

    return updatedRawgGame;
  }
}

export class HowLongtoBeatUpdateStrategy implements UpdateStrategy<HowLongToBeat> {
  constructor(private howLongToBeatService: HowLongToBeatService) { }

  async update(game: Game): Promise<HowLongToBeat> {
    if (game.howLongToBeat && !game.howLongToBeat?.notFoundOnHltb && differenceInDays(new Date(), game.howLongToBeat.updatedAt) <= 7) {
      return game.howLongToBeat;
    }

    const howLongToBeat = await this.howLongToBeatService.getGameByName(game.rawgGame.name);

    return plainToInstance(HowLongToBeat, howLongToBeat);
  }
}