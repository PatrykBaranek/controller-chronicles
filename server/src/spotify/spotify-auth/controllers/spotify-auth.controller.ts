import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { SpotifyAuthService } from '../services/spotify-auth.service';
import { SpotifyAuthGuard } from 'src/spotify/guards/spotify-auth.guard';
import { Response } from 'express';

@ApiTags('api/spotify/auth')
@Controller('spotify/auth')
export class SpotifyAuthController {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  async authorize() {
    const url = this.spotifyAuthService.getAuthorizeURL();
    return { url };
  }

  @Get('callback')
  @ApiExcludeEndpoint()
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    const tokens = await this.spotifyAuthService.getTokens(code);

    res.cookie('spotify_access_token', tokens.access_token, { httpOnly: true, secure: true, expires: new Date(Date.now() + tokens.expires_in * 1000) });
    res.cookie('spotify_refresh_token', tokens.refresh_token, { httpOnly: true, secure: true });

    const redirectUrl = this.configService.get<string>('SPOTIFY_CLIENT_REDIRECT_URI_AUTH_SUCCESS');

    res.redirect(redirectUrl);
  }

  @Get('getMe')
  @UseGuards(SpotifyAuthGuard)
  async getMe() {
    const result = await this.spotifyAuthService.api.getMe();
    return result.body;
  }
}
