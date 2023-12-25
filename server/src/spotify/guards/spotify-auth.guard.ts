import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { SpotifyAuthService } from '../spotify-auth/services/spotify-auth.service';
import { Response, Request } from 'express';

@Injectable()
export class SpotifyAuthGuard implements CanActivate {

  private readonly logger = new Logger(SpotifyAuthGuard.name);

  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    let access_token = request.cookies['spotify_access_token'];
    const refresh_token = request.cookies['spotify_refresh_token'];

    if (access_token == null && refresh_token == null) {
      this.logger.warn('No access token and refresh token found');
      return false;
    }

    if (access_token == null && refresh_token != null) {
      this.logger.log('Refreshing access token');
      const newTokens = await this.spotifyAuthService.refreshTokens(refresh_token);

      response.cookie('spotify_access_token', newTokens.access_token, { httpOnly: true, secure: true, expires: new Date(Date.now() + newTokens.expires_in * 1000) });
      response.cookie('spotify_refresh_token', newTokens.refresh_token, { httpOnly: true, secure: true });

      access_token = newTokens.access_token;
    }

    this.spotifyAuthService.api.setAccessToken(access_token);
    return true;
  }
}
