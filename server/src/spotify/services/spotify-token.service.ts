import { Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import { getDb } from 'src/lib/auth';

interface SpotifyAccount {
  userId: string;
  providerId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  scope: string;
}

@Injectable({ scope: Scope.REQUEST })
export class SpotifyTokenService {
  private get collection() {
    return getDb().collection('account');
  }

  async getApi(req: Request): Promise<SpotifyWebApi | null> {
    const userId = (req as any).user?.id as string | undefined;
    if (!userId) return null;

    const account = await this.collection.findOne({
      userId,
      providerId: 'spotify',
    }) as unknown as SpotifyAccount | null;

    if (!account) {
      return null;
    }

    const api = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    });

    if (account.accessTokenExpiresAt && new Date() >= account.accessTokenExpiresAt) {
      api.setRefreshToken(account.refreshToken);
      const data = await api.refreshAccessToken();

      const update: Record<string, unknown> = {
        accessToken: data.body['access_token'],
        accessTokenExpiresAt: new Date(
          Date.now() + data.body['expires_in'] * 1000,
        ),
      };

      if (data.body['refresh_token']) {
        update.refreshToken = data.body['refresh_token'];
      }

      await this.collection.updateOne(
        { userId, providerId: 'spotify' },
        { $set: update },
      );

      api.setAccessToken(data.body['access_token']);
      return api;
    }

    api.setAccessToken(account.accessToken);
    return api;
  }
}

