import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiTags } from '@nestjs/swagger';
import { FindEpisodeByGameDto } from './dto/find-episode-by-game.dto';

@ApiTags('SpotifyAPI')
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/login')
  @Redirect()
  async authorize() {
    const url = this.spotifyService.getAuthorizeURL();
    return { url };
  }

  @Get('/callback')
  @Redirect()
  async handleCallback(@Query('code') code: string) {
    await this.spotifyService.handleAuthorizationCallback(code);

    return { url: 'http://localhost:3000/spotify/podcasts' };
  }

  @Get('/podcasts')
  async searchPodcast(@Query('lang') language: string) {
    return this.spotifyService.getAllGamePodcasts(language);
  }

  @Get('/podcasts/episode/:id')
  async getEpisodeById(@Param('id') id: string) {
    return this.spotifyService.getEpisodeById(id);
  }

  @Get('/podcasts/game')
  async getEpisodesByGameTitle(
    @Body() findEpisodeByGameTitleDto: FindEpisodeByGameDto,
  ) {
    return this.spotifyService.getEpisodesByGameTitle(
      findEpisodeByGameTitleDto,
    );
  }

  @Get('/podcasts/:id')
  async getPodcast(@Param('id') id: string) {
    return this.spotifyService.getPodcastById(id);
  }

  @Get('/podcasts/:id/newrelease')
  async getPodcastNewRelease(@Param('id') id: string) {
    return this.spotifyService.getNewEpisodesForPodcast(id);
  }

  @Post('/podcasts/add/:id')
  async addPodcastToMyList(@Param('id') id: string) {
    await this.spotifyService.addPodcastToUserLibrary(id);

    return {
      statusCode: 200,
      message: 'Podcast added to your library',
    };
  }

  @Delete('/podcasts/remove/:id')
  async removePodcastFromMyList(@Param('id') id: string) {
    await this.spotifyService.removePodcastFromUserLibrary(id);

    return {
      statusCode: 200,
      message: 'Podcast removed from your library',
    };
  }
}
