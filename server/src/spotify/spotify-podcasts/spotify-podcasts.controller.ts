import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpotifyPodcastsService } from './spotify-podcasts.service';
import { SpotifyAuthGuard } from '../guards/spotify-auth.guard';

@Controller('spotify/podcasts')
@UseGuards(SpotifyAuthGuard)
export class SpotifyPodcastsController {
  constructor(
    private readonly spotifyPodcastsService: SpotifyPodcastsService,
  ) {}

  @Get()
  async getAllGamePodcasts(@Query('lang') language: string) {
    return this.spotifyPodcastsService.getAllGamePodcasts(language);
  }

  @Get(':id')
  async getPodcast(@Param('id') id: string) {
    return this.spotifyPodcastsService.getPodcastById(id);
  }

  @Get(':id/new-release')
  async getPodcastNewRelease(@Param('id') id: string) {
    return this.spotifyPodcastsService.getNewEpisodesForPodcast(id);
  }

  @Get('/users-list')
  async getPodcastsFromUserLibrary() {
    return this.spotifyPodcastsService.getPodcastsFromUserLibrary();
  }

  @Post('/add/:id')
  async addPodcastToMyList(@Param('id') id: string) {
    await this.spotifyPodcastsService.addPodcastToUserLibrary(id);

    return {
      statusCode: 200,
      message: 'Podcast added to your library',
    };
  }

  @Delete('/remove/:id')
  async removePodcastFromMyList(@Param('id') id: string) {
    await this.spotifyPodcastsService.removePodcastFromUserLibrary(id);

    return {
      statusCode: 200,
      message: 'Podcast removed from your library',
    };
  }
}
