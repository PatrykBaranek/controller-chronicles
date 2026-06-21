import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { IgdbAuthService } from '../igdb-auth/igdb-auth.service';

const IGDB_API_URL = 'https://api.igdb.com/v4/';

@Injectable()
export abstract class IgdbApiService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly igdbAuthService: IgdbAuthService,
    protected readonly configService: ConfigService,
    private readonly endpoint: string,
  ) {}

  private async getHeaders() {
    const accessToken = await this.igdbAuthService.getAccessToken();

    return {
      'Client-ID': this.configService.get<string>('IGDB_CLIENT_ID')!,
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };
  }

  protected async query<T>(apicalypseQuery: string): Promise<T[]> {
    const headers = await this.getHeaders();

    const response = await this.httpService.axiosRef.post<T[]>(
      `${IGDB_API_URL}${this.endpoint}`,
      apicalypseQuery,
      { headers },
    );

    return response.data;
  }

  protected async count(apicalypseCountQuery: string): Promise<number> {
    const headers = await this.getHeaders();

    const response = await this.httpService.axiosRef.post<{ count: number }>(
      `${IGDB_API_URL}${this.endpoint}/count`,
      apicalypseCountQuery,
      { headers },
    );

    return response.data.count;
  }
}
