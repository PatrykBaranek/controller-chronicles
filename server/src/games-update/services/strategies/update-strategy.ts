import { plainToInstance } from 'class-transformer';
import { differenceInDays } from 'date-fns';
import { Game, IgdbGame } from 'src/games/models/game.schema';
import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';

import { HowLongToBeatService } from 'src/how-long-to-beat/services/how-long-to-beat.service';

import { IgdbApiGamesService } from 'src/igdb/igdb-api/igdb-api-games/igdb-api-games.service';

interface UpdateStrategy<T> {
  update(game: Game): Promise<T>;
}

export class IgdbUpdateStrategy implements UpdateStrategy<IgdbGame> {
  constructor(private igdbApiGamesService: IgdbApiGamesService) {}

  async update(game: Game): Promise<IgdbGame> {
    const updatedIgdbGame = await this.igdbApiGamesService.getGameById(
      game._id,
    );

    return updatedIgdbGame;
  }
}

export class HowLongtoBeatUpdateStrategy implements UpdateStrategy<HowLongToBeat> {
  constructor(private howLongToBeatService: HowLongToBeatService) {}

  async update(game: Game): Promise<HowLongToBeat> {
    if (
      game.howLongToBeat &&
      !game.howLongToBeat?.notFoundOnHltb &&
      differenceInDays(new Date(), game.howLongToBeat.updatedAt) <= 7
    ) {
      return game.howLongToBeat;
    }

    const howLongToBeat = await this.howLongToBeatService.getGameByName(
      game.igdbGame.name,
    );

    return plainToInstance(HowLongToBeat, howLongToBeat);
  }
}
