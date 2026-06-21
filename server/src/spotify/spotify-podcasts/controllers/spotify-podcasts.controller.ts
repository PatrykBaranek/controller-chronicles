import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DefaultQueryParamsDto } from 'src/spotify/dto/default-query-params.dto';
import { SpotifyPodcastsService } from '../services/spotify-podcasts.service';

@ApiTags('api/spotify/podcasts')
@Controller('spotify/podcasts')
export class SpotifyPodcastsController {
  constructor(
    private readonly spotifyPodcastsService: SpotifyPodcastsService,
  ) {}

  @ApiOperation({ summary: 'Get all game podcasts' })
  @ApiResponse({ status: 200, description: 'Return all game podcasts' })
  @Get()
  async getAllGamePodcasts(
    @Req() req: Request,
    @Query() { limit, offset }: DefaultQueryParamsDto,
  ) {
    return this.spotifyPodcastsService.getAllGamePodcasts(req, limit, offset);
  }

  @ApiOperation({ summary: 'Get podcast by ID' })
  @ApiResponse({ status: 200, description: 'Return podcast details by ID' })
  @Get(':id')
  async getPodcast(@Req() req: Request, @Param('id') id: string) {
    return this.spotifyPodcastsService.getPodcastById(req, id);
  }

  @ApiOperation({ summary: 'Get user podcasts' })
  @ApiResponse({ status: 200, description: 'Return user podcasts' })
  @Get('/user/list')
  async getUsersPodcasts(
    @Req() req: Request,
    @Query() { limit, offset }: DefaultQueryParamsDto,
  ) {
    return this.spotifyPodcastsService.getUserPodcasts(req, limit, offset);
  }

  @ApiOperation({ summary: 'Add podcast to user library' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Podcast added to user library',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/add/:id')
  async addPodcastToMyList(@Req() req: Request, @Param('id') id: string) {
    await this.spotifyPodcastsService.addPodcastToUserLibrary(req, id);
    return { message: 'Podcast added to your library' };
  }

  @ApiOperation({ summary: 'Remove podcast from user library' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Podcast removed from user library',
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/remove/:id')
  async removePodcastFromMyList(@Req() req: Request, @Param('id') id: string) {
    await this.spotifyPodcastsService.removePodcastFromUserLibrary(req, id);
    return { message: 'Podcast removed from your library' };
  }
}
