import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { SpotifySoundtracksService } from '../services/spotify-soundtracks.service';
import { ApiTags } from '@nestjs/swagger';
import { SpotifyAuthGuard } from '../../guards/spotify-auth.guard';

@ApiTags('api/spotify/soundtracks')
@Controller('spotify/soundtracks')
@UseGuards(SpotifyAuthGuard)
export class SpotifySoundtracksController {
  constructor(private readonly spotifySoundtracksService: SpotifySoundtracksService) {}

  @Get(':gameId')
  getSoundtracksForGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.spotifySoundtracksService.getSoundtracksForGame(gameId);
  }

  @Get(':gameId/playlists')
  getPlaylistsForGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.spotifySoundtracksService.getPlaylistsForGame(gameId);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  addSoundtrack(@Param('id') id: string) {
    return this.spotifySoundtracksService.addSoundtrack(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSoundtrack(@Param('id') id: string) {
    return this.spotifySoundtracksService.removeSoundtrack(id);
  }
}
