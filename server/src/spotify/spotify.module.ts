import { Module } from '@nestjs/common';
import { SpotifyAuthController } from './spotify-auth/controllers/spotify-auth.controller';
import { SpotifyPodcastsController } from './spotify-podcasts/controllers/spotify-podcasts.controller';
import { SpotifyEpisodesController } from './spotify-episodes/controllers/spotify-episodes.controller';
import { SpotifyAuthService } from './spotify-auth/services/spotify-auth.service';
import { SpotifyPodcastsService } from './spotify-podcasts/services/spotify-podcasts.service';
import { SpotifyEpisodesService } from './spotify-episodes/services/spotify-episodes.service';
import { SpotifySoundtracksService } from './spotify-soundtracks/services/spotify-soundtracks.service';
import { SpotifySoundtracksController } from './spotify-soundtracks/controllers/spotify-soundtracks.controller';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [GamesModule],
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
export class SpotifyModule { }
