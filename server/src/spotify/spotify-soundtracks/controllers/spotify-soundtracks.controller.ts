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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/spotify/soundtracks')
@Controller('spotify/soundtracks')
export class SpotifySoundtracksController {
  constructor(
    private readonly spotifySoundtracksService: SpotifySoundtracksService,
  ) {}

  @Get(':gameId')
  getSoundtracksForGame(
    @Req() req: Request,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.spotifySoundtracksService.getSoundtracksForGame(req, gameId);
  }

  @Get(':gameId/playlists')
  getPlaylistsForGame(
    @Req() req: Request,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.spotifySoundtracksService.getPlaylistsForGame(req, gameId);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  addSoundtrack(@Req() req: Request, @Param('id') id: string) {
    return this.spotifySoundtracksService.addSoundtrack(req, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSoundtrack(@Req() req: Request, @Param('id') id: string) {
    return this.spotifySoundtracksService.removeSoundtrack(req, id);
  }
}
