import { Module } from '@nestjs/common';
import { SpotifyPodcastsController } from './spotify-podcasts/controllers/spotify-podcasts.controller';
import { SpotifyEpisodesController } from './spotify-episodes/controllers/spotify-episodes.controller';
import { SpotifySoundtracksController } from './spotify-soundtracks/controllers/spotify-soundtracks.controller';
import { SpotifyTokenService } from './services/spotify-token.service';
import { SpotifyPodcastsService } from './spotify-podcasts/services/spotify-podcasts.service';
import { SpotifyEpisodesService } from './spotify-episodes/services/spotify-episodes.service';
import { SpotifySoundtracksService } from './spotify-soundtracks/services/spotify-soundtracks.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [GamesModule],
  providers: [
    SpotifyTokenService,
    SpotifyPodcastsService,
    SpotifyEpisodesService,
    SpotifySoundtracksService,
  ],
  controllers: [
    SpotifyPodcastsController,
    SpotifyEpisodesController,
    SpotifySoundtracksController,
  ],
})
export class SpotifyModule {}
