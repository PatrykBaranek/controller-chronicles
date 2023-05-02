import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SpotifyAuthController } from './spotify-auth/spotify-auth.controller';
import { SpotifyPodcastsController } from './spotify-podcasts/spotify-podcasts.controller';
import { SpotifyEpisodesController } from './spotify-episodes/spotify-episodes.controller';
import { SpotifyAuthService } from './spotify-auth/spotify-auth.service';
import { SpotifyPodcastsService } from './spotify-podcasts/spotify-podcasts.service';
import { SpotifyEpisodesService } from './spotify-episodes/spotify-episodes.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    SpotifyAuthService,
    SpotifyPodcastsService,
    SpotifyEpisodesService,
  ],
  controllers: [
    SpotifyAuthController,
    SpotifyPodcastsController,
    SpotifyEpisodesController,
  ],
})
export class SpotifyModule {}
