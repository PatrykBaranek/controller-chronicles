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

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.initializeSpotifyApi();
  }

  isAuthenticated(): boolean {
    return !!this.spotifyApi.getAccessToken();
  }

  private initializeSpotifyApi() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: 'http://localhost:3000/api/spotify/auth/callback',
    });
  }

  getAuthorizeURL(): string {
    return this.spotifyApi.createAuthorizeURL(scopes, '');
  }

  async handleAuthorizationCallback(code: string): Promise<void> {
    const data = await this.spotifyApi.authorizationCodeGrant(code);
    this.spotifyApi.setAccessToken(data.body['access_token']);
    this.spotifyApi.setRefreshToken(data.body['refresh_token']);
  }
}
