import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SpotifyEpisodesService } from '../services/spotify-episodes.service';
import { SpotifyAuthGuard } from '../../guards/spotify-auth.guard';

@ApiTags('api/spotify/episodes')
@Controller('spotify/episodes')
@UseGuards(SpotifyAuthGuard)
export class SpotifyEpisodesController {
  constructor(
    private readonly spotifyEpisodesService: SpotifyEpisodesService,
  ) {}

  @ApiOperation({ summary: 'Get episode by id' })
  @ApiParam({ name: 'id', description: 'Episode id' })
  @Get(':id')
  async getEpisodeById(@Param('id') id: string) {
    return this.spotifyEpisodesService.getEpisodeById(id);
  }

  @ApiOperation({ summary: 'Get episodes by game title' })
  @Get('game/:gameId')
  async getEpisodesByGameTitle(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.spotifyEpisodesService.getEpisodesByGameTitle(gameId);
  }
}
