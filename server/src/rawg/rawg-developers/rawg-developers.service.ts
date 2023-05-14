import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class RawgDevelopersService {
  private readonly url = 'https://api.rawg.io/api/developers';

  constructor(private readonly httpService: HttpService) {}

  getDevelopers() {
    return this.httpService
      .get(this.url + `?key=${process.env.RAWG_API_KEY}`)
      .pipe(map((response) => response.data));
  }

  getDeveloper(id: number) {
    return this.httpService
      .get(this.url + `/${id}?key=${process.env.RAWG_API_KEY}`)
      .pipe(map((response) => response.data));
  }
}
