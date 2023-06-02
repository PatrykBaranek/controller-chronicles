import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindEpisodeByGameQueryParamsDto } from '../dto/find-episode-by-game.dto';
import { SpotifyEpisodesService } from './spotify-episodes.service';
import { SpotifyAuthGuard } from '../guards/spotify-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
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
  @Get('game/:gameId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getEpisodesByGameTitle(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Query() findEpisodeByGameTitleDto: FindEpisodeByGameQueryParamsDto,
  ) {
    return this.spotifyEpisodesService.getEpisodesByGameTitle(
      gameId,
      findEpisodeByGameTitleDto,
    );
  }
}
