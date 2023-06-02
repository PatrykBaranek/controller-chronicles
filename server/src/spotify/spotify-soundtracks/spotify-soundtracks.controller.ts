import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SpotifySoundtracksService } from './spotify-soundtracks.service';
import { ApiTags } from '@nestjs/swagger';
import { SpotifyAuthGuard } from '../guards/spotify-auth.guard';

@ApiTags('spotify/soundtracks')
@Controller('spotify/soundtracks')
@UseGuards(SpotifyAuthGuard)
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
