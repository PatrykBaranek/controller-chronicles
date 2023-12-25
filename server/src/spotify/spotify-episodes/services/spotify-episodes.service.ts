import { Injectable } from '@nestjs/common';
import { SpotifyAuthService } from '../../spotify-auth/services/spotify-auth.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class SpotifyEpisodesService {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly gamesService: GamesService,
  ) {}

  async getEpisodesByGameTitle(gameId: number) {
    const game = await this.gamesService.getGameById(gameId);

    const response = await this.spotifyAuthService.api.searchEpisodes(game.rawgGame.name);

    return response.body.episodes.items;
  }

  async getEpisodeById(id: string) {
    const response = await this.spotifyAuthService.api.getEpisode(id);
    return response.body;
  }
}
