import { HowLongtoBeatUpdateStrategy, RawgUpdateStrategy } from './update-strategy';


export enum UpdateStrategyType {
  RAWG = 'RAWG',
  HLTB = 'HLTB'
}

export class UpdateStrategyFactory {
  static createUpdateStrategy(type: UpdateStrategyType, services: any) {
    switch (type) {
      case UpdateStrategyType.RAWG:
        return new RawgUpdateStrategy(services.rawgApiGamesService);

      case UpdateStrategyType.HLTB:
        return new HowLongtoBeatUpdateStrategy(services.howLongToBeatService);

      default:
        throw new Error('UpdateStrategyType not found');
    }
  }
}