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
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { DefaultQueryParamsDto } from 'src/spotify/dto/default-query-params.dto';
import { SpotifyPodcastsService } from '../services/spotify-podcasts.service';
import { PagingObjectDto } from 'src/spotify/dto/pagining-object.dto';
import { SpotifyItemObjectDto } from 'src/spotify/dto/spotify-item-object.dto';
import { GetUserPodcastsDto } from 'src/spotify/dto/get-user-podcasts.dto';

@ApiTags('api/spotify/podcasts')
@Controller('spotify/podcasts')
export class SpotifyPodcastsController {
  constructor(
    private readonly spotifyPodcastsService: SpotifyPodcastsService,
  ) {}

  @ApiOperation({ summary: 'Get all game podcasts' })
  @ApiResponse({
    status: 200,
    description: 'Return all game podcasts',
    type: PagingObjectDto<SpotifyItemObjectDto>,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async getAllGamePodcasts(
    @Req() req: Request,
    @Query() { limit, offset }: DefaultQueryParamsDto,
  ) {
    return this.spotifyPodcastsService.getAllGamePodcasts(req, limit, offset);
  }

  @ApiOperation({ summary: 'Get podcast by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the podcast' })
  @ApiResponse({
    status: 200,
    description: 'Return podcast details by ID',
    type: SpotifyItemObjectDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Podcast not found' })
  @Get(':id')
  async getPodcast(@Req() req: Request, @Param('id') id: string) {
    return this.spotifyPodcastsService.getPodcastById(req, id);
  }

  @ApiOperation({ summary: 'Get user podcasts' })
  @ApiResponse({
    status: 200,
    description: 'Return user podcasts',
    type: PagingObjectDto<GetUserPodcastsDto>,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('/user/list')
  async getUsersPodcasts(
    @Req() req: Request,
    @Query() { limit, offset }: DefaultQueryParamsDto,
  ) {
    return this.spotifyPodcastsService.getUserPodcasts(req, limit, offset);
  }

  @ApiOperation({ summary: 'Add podcast to user library' })
  @ApiParam({ name: 'id', description: 'The ID of the podcast' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Podcast added to user library',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Podcast not found' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/add/:id')
  async addPodcastToMyList(@Req() req: Request, @Param('id') id: string) {
    await this.spotifyPodcastsService.addPodcastToUserLibrary(req, id);
    return { message: 'Podcast added to your library' };
  }

  @ApiOperation({ summary: 'Remove podcast from user library' })
  @ApiParam({ name: 'id', description: 'The ID of the podcast' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Podcast removed from user library',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Podcast not found' })
  @HttpCode(HttpStatus.OK)
  @Delete('/remove/:id')
  async removePodcastFromMyList(@Req() req: Request, @Param('id') id: string) {
    await this.spotifyPodcastsService.removePodcastFromUserLibrary(req, id);
    return { message: 'Podcast removed from your library' };
  }
}
