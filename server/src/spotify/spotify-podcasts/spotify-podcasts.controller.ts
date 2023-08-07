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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('api/spotify/podcasts')
@ApiBearerAuth()
@Controller('api/spotify/podcasts')
@UseGuards(SpotifyAuthGuard)
export class SpotifyPodcastsController {
  constructor(
    private readonly spotifyPodcastsService: SpotifyPodcastsService,
  ) {}

  @ApiOperation({ summary: 'Get all game podcasts' })
  @ApiQuery({
    name: 'lang',
    description: 'Language code',
    required: false,
    enum: ['pl', 'en'],
  })
  @ApiResponse({ status: 200, description: 'Return all game podcasts' })
  @Get()
  async getAllGamePodcasts(@Query('lang') language: string) {
    return this.spotifyPodcastsService.getAllGamePodcasts(language);
  }

  @ApiOperation({ summary: 'Get podcast by ID' })
  @ApiResponse({ status: 200, description: 'Return podcast by ID' })
  @Get(':id')
  async getPodcast(@Param('id') id: string) {
    return this.spotifyPodcastsService.getPodcastById(id);
  }

  @ApiOperation({ summary: 'Get new release episodes for a podcast' })
  @ApiResponse({
    status: 200,
    description: 'Return new release episodes for a podcast',
  })
  @Get(':id/new-release')
  async getPodcastNewRelease(@Param('id') id: string) {
    return this.spotifyPodcastsService.getNewEpisodesForPodcast(id);
  }

  @ApiOperation({ summary: 'Get podcasts from user library' })
  @ApiResponse({
    status: 200,
    description: 'Return podcasts from user library',
  })
  @Get('/users-list')
  async getPodcastsFromUserLibrary() {
    return this.spotifyPodcastsService.getPodcastsFromUserLibrary();
  }

  @ApiOperation({ summary: 'Add podcast to user library' })
  @ApiResponse({ status: 200, description: 'Podcast added to user library' })
  @Post('/add/:id')
  async addPodcastToMyList(@Param('id') id: string) {
    await this.spotifyPodcastsService.addPodcastToUserLibrary(id);

    return {
      statusCode: 200,
      message: 'Podcast added to your library',
    };
  }

  @ApiOperation({ summary: 'Remove podcast from user library' })
  @ApiResponse({
    status: 200,
    description: 'Podcast removed from user library',
  })
  @Delete('/remove/:id')
  async removePodcastFromMyList(@Param('id') id: string) {
    await this.spotifyPodcastsService.removePodcastFromUserLibrary(id);

    return {
      statusCode: 200,
      message: 'Podcast removed from your library',
    };
  }
}
