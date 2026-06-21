import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SpotifyEpisodesService } from '../services/spotify-episodes.service';

@ApiTags('api/spotify/episodes')
@Controller('spotify/episodes')
export class SpotifyEpisodesController {
  constructor(
    private readonly spotifyEpisodesService: SpotifyEpisodesService,
  ) {}

  @ApiOperation({ summary: 'Get episode by id' })
  @ApiParam({ name: 'id', description: 'Episode id' })
  @Get(':id')
  async getEpisodeById(@Req() req: Request, @Param('id') id: string) {
    return this.spotifyEpisodesService.getEpisodeById(req, id);
  }

  @ApiOperation({ summary: 'Get episodes by game title' })
  @Get('game/:gameId')
  async getEpisodesByGameTitle(
    @Req() req: Request,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.spotifyEpisodesService.getEpisodesByGameTitle(req, gameId);
  }
}
