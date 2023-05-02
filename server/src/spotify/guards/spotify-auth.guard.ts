import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SpotifyAuthService } from '../spotify-auth/spotify-auth.service';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

@Injectable()
export class SpotifyAuthGuard implements CanActivate {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isAuthenticated = this.spotifyAuthService.isAuthenticated();
    if (!isAuthenticated) {
      const res = context.switchToHttp().getResponse<Response>();
      const authUrl = this.spotifyAuthService.getAuthorizeURL();
      res.redirect(authUrl);
      return false;
    }

    return isAuthenticated;
  }
}
