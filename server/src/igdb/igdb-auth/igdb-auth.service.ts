import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IgdbToken, IgdbTokenDocument } from './models/igdb-token.schema';

const TWITCH_OAUTH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const EXPIRY_SAFETY_BUFFER_MS = 24 * 60 * 60 * 1000;

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class IgdbAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(IgdbToken.name)
    private readonly igdbTokenModel: Model<IgdbTokenDocument>,
  ) {}

  async getAccessToken(): Promise<string> {
    const existingToken = await this.igdbTokenModel.findOne({});

    if (existingToken && existingToken.expiresAt.getTime() - EXPIRY_SAFETY_BUFFER_MS > Date.now()) {
      return existingToken.accessToken;
    }

    return this.refreshAccessToken();
  }

  private async refreshAccessToken(): Promise<string> {
    const response = await this.httpService.axiosRef.post<TwitchTokenResponse>(
      TWITCH_OAUTH_TOKEN_URL,
      null,
      {
        params: {
          client_id: this.configService.get<string>('IGDB_CLIENT_ID'),
          client_secret: this.configService.get<string>('IGDB_CLIENT_SECRET'),
          grant_type: 'client_credentials',
        },
      },
    );

    const { access_token, expires_in, token_type } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    await this.igdbTokenModel.findOneAndUpdate(
      {},
      {
        $set: {
          accessToken: access_token,
          tokenType: token_type,
          expiresAt,
        },
      },
      { upsert: true },
    );

    return access_token;
  }
}
