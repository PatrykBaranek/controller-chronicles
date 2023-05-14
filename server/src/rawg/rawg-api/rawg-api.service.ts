import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RawgApiService {
  protected rawgApiUrl = 'https://api.rawg.io/api/';

  constructor(protected readonly httpService: HttpService, routeName: string) {
    this.rawgApiUrl += routeName;
  }
}
