import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SpotifySoundtracksService } from './spotify-soundtracks.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('spotify/soundtracks')
@Controller('spotify/soundtracks')
export class SpotifySoundtracksController {
  constructor(
    private readonly spotifySoundtracksService: SpotifySoundtracksService,
  ) {}

  @Get(':gameId')
  getSoundtracksForGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.spotifySoundtracksService.getSoundtracksForGame(gameId);
  }

  @Post(':id')
  addSoundtrack(@Param('id') id: string) {
    return this.spotifySoundtracksService.addSoundtrack(id);
  }
}
