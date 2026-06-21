import { Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { SpotifyTokenService } from '../../services/spotify-token.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable({ scope: Scope.REQUEST })
export class SpotifyEpisodesService {
  constructor(
    private readonly spotifyTokenService: SpotifyTokenService,
    private readonly gamesService: GamesService,
  ) {}

  async getEpisodesByGameTitle(req: Request, gameId: number) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) return [];

    const game = await this.gamesService.getGameById(gameId);

    const response = await api.searchEpisodes(game.rawgGame.name);

    return response.body.episodes!.items;
  }

  async getEpisodeById(req: Request, id: string) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) return null;

    const response = await api.getEpisode(id);
    return response.body;
  }
}
