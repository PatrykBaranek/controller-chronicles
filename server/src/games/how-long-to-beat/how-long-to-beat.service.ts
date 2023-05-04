import { HowLongToBeatService as HLTBService } from 'howlongtobeat';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HowLongToBeatResponseDto } from '../dto/how-long-to-beat-response.dto';

@Injectable()
export class HowLongToBeatService {
  private readonly hltbService: HLTBService;

  constructor() {
    this.hltbService = new HLTBService();
  }

  async getGameByName(gameName: string) {
    const hltbGame = await this.hltbService.search(gameName);

    return plainToInstance(HowLongToBeatResponseDto, hltbGame[0]);
  }
}
