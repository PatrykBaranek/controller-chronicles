import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { SpotifySoundtracksService } from '../services/spotify-soundtracks.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('api/spotify/soundtracks')
@Controller('spotify/soundtracks')
export class SpotifySoundtracksController {
  constructor(
    private readonly spotifySoundtracksService: SpotifySoundtracksService,
  ) {}

  @ApiOperation({ summary: 'Get soundtracks for a game' })
  @ApiParam({ name: 'gameId', description: 'The ID of the game' })
  @ApiResponse({ status: 200, description: 'Returns soundtracks for the game' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':gameId')
  getSoundtracksForGame(
    @Req() req: Request,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.spotifySoundtracksService.getSoundtracksForGame(req, gameId);
  }

  @ApiOperation({ summary: 'Get Spotify playlists for a game' })
  @ApiParam({ name: 'gameId', description: 'The ID of the game' })
  @ApiResponse({ status: 200, description: 'Returns playlists for the game' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':gameId/playlists')
  getPlaylistsForGame(
    @Req() req: Request,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.spotifySoundtracksService.getPlaylistsForGame(req, gameId);
  }

  @ApiOperation({ summary: 'Add a soundtrack to a game' })
  @ApiParam({ name: 'id', description: 'The ID of the soundtrack' })
  @ApiResponse({ status: 201, description: 'Soundtrack added to the game' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  addSoundtrack(@Req() req: Request, @Param('id') id: string) {
    return this.spotifySoundtracksService.addSoundtrack(req, id);
  }

  @ApiOperation({ summary: 'Remove a soundtrack from a game' })
  @ApiParam({ name: 'id', description: 'The ID of the soundtrack' })
  @ApiResponse({ status: 204, description: 'Soundtrack removed from the game' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Soundtrack not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSoundtrack(@Req() req: Request, @Param('id') id: string) {
    return this.spotifySoundtracksService.removeSoundtrack(req, id);
  }
}
