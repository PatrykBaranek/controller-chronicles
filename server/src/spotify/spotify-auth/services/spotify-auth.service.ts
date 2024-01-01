import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import SpotifyWebApi from 'spotify-web-api-node';
import scopes from '../../constants/scopes';

@Injectable()
export class SpotifyAuthService {
  private spotifyApi: SpotifyWebApi;

  get api(): SpotifyWebApi {
    return this.spotifyApi;
  }

  constructor(private readonly configService: ConfigService) {
    this.initializeSpotifyApi();
  }

  isAuthenticated(): boolean {
    return !!this.spotifyApi.getAccessToken();
  }

  private initializeSpotifyApi() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('SPOTIFY_REDIRECT_URI'),
    });
  }

  getAuthorizeURL(): string {
    this.initializeSpotifyApi();
    return this.spotifyApi.createAuthorizeURL(scopes, this.configService.get<string>('SPOTIFY_CLIENT_STATE'));
  }

  async getTokens(code: string) {
    const data = await this.spotifyApi.authorizationCodeGrant(code);
    this.spotifyApi.setAccessToken(data.body['access_token']);
    this.spotifyApi.setRefreshToken(data.body['refresh_token']);

    return {
      access_token: this.spotifyApi.getAccessToken(),
      refresh_token: this.spotifyApi.getRefreshToken(),
      expires_in: data.body['expires_in'],
    };
  }

  async refreshTokens(refresh_token: string) {
    this.spotifyApi.setRefreshToken(refresh_token);
    const data = await this.spotifyApi.refreshAccessToken();

    return {
      access_token: data.body['access_token'],
      refresh_token: this.spotifyApi.getRefreshToken(),
      expires_in: data.body['expires_in'],
    };
  }

  async getMe() {
    const data = await this.spotifyApi.getMe();
    return data.body;
  }
}
