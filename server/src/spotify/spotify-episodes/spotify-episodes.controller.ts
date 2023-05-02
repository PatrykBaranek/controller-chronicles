import { Body, Controller, Get, Param } from '@nestjs/common';
import { FindEpisodeByGameDto } from '../dto/find-episode-by-game.dto';
import { SpotifyEpisodesService } from './spotify-episodes.service';

@Controller('spotify/episodes')
export class SpotifyEpisodesController {
  constructor(
    private readonly spotifyEpisodesService: SpotifyEpisodesService,
  ) {}

  @Get(':id')
  async getEpisodeById(@Param('id') id: string) {
    return this.spotifyEpisodesService.getEpisodeById(id);
  }

  @Get('game')
  async getEpisodesByGameTitle(
    @Body() findEpisodeByGameTitleDto: FindEpisodeByGameDto,
  ) {
    return this.spotifyEpisodesService.getEpisodesByGameTitle(
      findEpisodeByGameTitleDto,
    );
  }
}
