import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindEpisodeByGameDto } from '../dto/find-episode-by-game.dto';
import { SpotifyEpisodesService } from './spotify-episodes.service';
import { SpotifyAuthGuard } from '../guards/spotify-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('spotify/episodes')
@ApiBearerAuth()
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
  @ApiBody({ type: FindEpisodeByGameDto })
  @Get('/game/search')
  async getEpisodesByGameTitle(
    @Body() findEpisodeByGameTitleDto: FindEpisodeByGameDto,
  ) {
    return this.spotifyEpisodesService.getEpisodesByGameTitle(
      findEpisodeByGameTitleDto,
    );
  }
}
