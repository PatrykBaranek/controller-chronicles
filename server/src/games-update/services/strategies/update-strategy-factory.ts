import { Injectable } from '@nestjs/common';
import { HowLongtoBeatUpdateStrategy, RawgUpdateStrategy } from './update-strategy';
import { RawgApiGamesService } from 'src/rawg/rawg-api/rawg-api-games/rawg-api-games.service';
import { HowLongToBeatService } from 'src/how-long-to-beat/services/how-long-to-beat.service';


export enum UpdateStrategyType {
  RAWG = 'RAWG',
  HLTB = 'HLTB'
}

@Injectable()
export class UpdateStrategyFactory {

  constructor(
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly howLongToBeatService: HowLongToBeatService,
  ) {}

  createUpdateStrategy(type: UpdateStrategyType) {
    switch (type) {
      case UpdateStrategyType.RAWG:
        return new RawgUpdateStrategy(this.rawgApiGamesService);

      case UpdateStrategyType.HLTB:
        return new HowLongtoBeatUpdateStrategy(this.howLongToBeatService);

      default:
        throw new Error('UpdateStrategyType not found');
    }
  }
}