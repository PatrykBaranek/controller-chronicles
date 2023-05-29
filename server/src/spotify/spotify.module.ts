import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SpotifyAuthController } from './spotify-auth/spotify-auth.controller';
import { SpotifyPodcastsController } from './spotify-podcasts/spotify-podcasts.controller';
import { SpotifyEpisodesController } from './spotify-episodes/spotify-episodes.controller';
import { SpotifyAuthService } from './spotify-auth/spotify-auth.service';
import { SpotifyPodcastsService } from './spotify-podcasts/spotify-podcasts.service';
import { SpotifyEpisodesService } from './spotify-episodes/spotify-episodes.service';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';
import { SpotifySoundtracksService } from './spotify-soundtracks/spotify-soundtracks.service';
import { SpotifySoundtracksController } from './spotify-soundtracks/spotify-soundtracks.controller';

@Module({
  imports: [ScheduleModule.forRoot(), RawgGamesModule],
  providers: [
    SpotifyAuthService,
    SpotifyPodcastsService,
    SpotifyEpisodesService,
    SpotifySoundtracksService,
  ],
  controllers: [
    SpotifyAuthController,
    SpotifyPodcastsController,
    SpotifyEpisodesController,
    SpotifySoundtracksController,
  ],
})
export class SpotifyModule {}
