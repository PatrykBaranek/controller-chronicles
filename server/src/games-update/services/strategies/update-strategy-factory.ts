import { Injectable } from '@nestjs/common';
import {
  HowLongtoBeatUpdateStrategy,
  IgdbUpdateStrategy,
} from './update-strategy';
import { IgdbApiGamesService } from 'src/igdb/igdb-api/igdb-api-games/igdb-api-games.service';
import { HowLongToBeatService } from 'src/how-long-to-beat/services/how-long-to-beat.service';

export enum UpdateStrategyType {
  IGDB = 'IGDB',
  HLTB = 'HLTB',
}

@Injectable()
export class UpdateStrategyFactory {
  constructor(
    private readonly igdbApiGamesService: IgdbApiGamesService,
    private readonly howLongToBeatService: HowLongToBeatService,
  ) {}

  createUpdateStrategy(type: UpdateStrategyType) {
    switch (type) {
      case UpdateStrategyType.IGDB:
        return new IgdbUpdateStrategy(this.igdbApiGamesService);

      case UpdateStrategyType.HLTB:
        return new HowLongtoBeatUpdateStrategy(this.howLongToBeatService);

      default:
        throw new Error('UpdateStrategyType not found');
    }
  }
}
