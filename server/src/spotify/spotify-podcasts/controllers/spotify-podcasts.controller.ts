import { Controller, Delete, Get, HttpCode, Param, Post, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { DefaultQueryParamsDto } from 'src/spotify/dto/default-query-params.dto';
import { SpotifyAuthGuard } from '../../guards/spotify-auth.guard';
import { SpotifyPodcastsService } from '../services/spotify-podcasts.service';

@ApiTags('api/spotify/podcasts')
@ApiBearerAuth()
@Controller('spotify/podcasts')
@UseGuards(SpotifyAuthGuard)
export class SpotifyPodcastsController {
  constructor(
    private readonly spotifyPodcastsService: SpotifyPodcastsService,
  ) {}

  @ApiOperation({ summary: 'Get all game podcasts' })
  @ApiResponse({ status: 200, description: 'Return all game podcasts' })
  @Get()
  async getAllGamePodcasts(@Query() { limit, offset }: DefaultQueryParamsDto) {
    return this.spotifyPodcastsService.getAllGamePodcasts(limit, offset);
  }

  @ApiOperation({ summary: 'Get podcast by ID' })
  @ApiResponse({ status: 200, description: 'Return podcast details by ID' })
  @Get(':id')
  async getPodcast(@Param('id') id: string) {
    return this.spotifyPodcastsService.getPodcastById(id);
  }

  @ApiOperation({ summary: 'Get user podcasts' })
  @ApiResponse({ status: 200, description: 'Return user podcasts' })
  @Get('/user/list')
  async getUsersPodcasts(@Query() { limit, offset }: DefaultQueryParamsDto) {
    return this.spotifyPodcastsService.getUserPodcasts(limit, offset);
  }

  @ApiOperation({ summary: 'Add podcast to user library' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Podcast added to user library' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/add/:id')
  async addPodcastToMyList(@Param('id') id: string) {
    await this.spotifyPodcastsService.addPodcastToUserLibrary(id);

    return {
      message: 'Podcast added to your library',
    };
  }

  @ApiOperation({ summary: 'Remove podcast from user library' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Podcast removed from user library' })
  @HttpCode(HttpStatus.OK)
  @Delete('/remove/:id')
  async removePodcastFromMyList(@Param('id') id: string) {
    await this.spotifyPodcastsService.removePodcastFromUserLibrary(id);

    return {
      message: 'Podcast removed from your library',
    };
  }
}
