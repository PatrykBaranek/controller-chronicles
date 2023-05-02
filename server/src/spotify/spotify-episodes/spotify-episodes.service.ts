import { Injectable } from '@nestjs/common';
import { FindEpisodeByGameDto } from '../dto/find-episode-by-game.dto';
import { SpotifyAuthService } from '../spotify-auth/spotify-auth.service';

@Injectable()
export class SpotifyEpisodesService {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  async getEpisodesByGameTitle(
    findEpisodeByGameTitleDto: FindEpisodeByGameDto,
  ) {
    const response = await this.spotifyAuthService.api.searchEpisodes(
      findEpisodeByGameTitleDto.gameTitle.toLocaleLowerCase(),
      {
        limit: findEpisodeByGameTitleDto.limit,
      },
    );

    return response.body.episodes.items.filter((show) =>
      show.languages.includes(findEpisodeByGameTitleDto.language),
    );
  }

  async getEpisodeById(id: string) {
    const response = await this.spotifyAuthService.api.getEpisode(id);
    return response.body;
  }
}
