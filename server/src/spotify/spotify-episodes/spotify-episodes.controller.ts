import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindEpisodeByGameDto } from '../dto/find-episode-by-game.dto';
import { SpotifyEpisodesService } from './spotify-episodes.service';
import { SpotifyAuthGuard } from '../guards/spotify-auth.guard';

@Controller('spotify/episodes')
@UseGuards(SpotifyAuthGuard)
export class SpotifyEpisodesController {
  constructor(
    private readonly spotifyEpisodesService: SpotifyEpisodesService,
  ) {}

  @Get(':id')
  async getEpisodeById(@Param('id') id: string) {
    return this.spotifyEpisodesService.getEpisodeById(id);
  }

  @Get('/game/search')
  async getEpisodesByGameTitle(
    @Body() findEpisodeByGameTitleDto: FindEpisodeByGameDto,
  ) {
    return this.spotifyEpisodesService.getEpisodesByGameTitle(
      findEpisodeByGameTitleDto,
    );
  }
}
