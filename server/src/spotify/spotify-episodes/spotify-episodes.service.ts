import { Injectable } from '@nestjs/common';
import { FindEpisodeByGameQueryParamsDto } from '../dto/find-episode-by-game.dto';
import { SpotifyAuthService } from '../spotify-auth/spotify-auth.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class SpotifyEpisodesService {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly gamesService: GamesService,
  ) {}

  async getEpisodesByGameTitle(
    gameId: number,
    findEpisodeByGameQueryParamsDto: FindEpisodeByGameQueryParamsDto,
  ) {
    const game = await this.gamesService.getGameById(gameId);

    const response = await this.spotifyAuthService.api.searchEpisodes(
      game.rawgGame.name,
    );

    return response.body.episodes.items.filter((show) =>
      show.languages.includes(findEpisodeByGameQueryParamsDto.language),
    );
  }

  async getEpisodeById(id: string) {
    const response = await this.spotifyAuthService.api.getEpisode(id);
    return response.body;
  }
}
