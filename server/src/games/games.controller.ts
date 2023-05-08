import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { GetGameVideoReviewDto } from './youtube/dto/get-game-video-review.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { YoutubeService } from './youtube/youtube.service';
import { PaginationDto } from './dto/pagination.dto';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';
import { SteamService } from './steam/steam.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly youtubeService: YoutubeService,
    private readonly steamService: SteamService,
  ) {}

  @ApiOperation({ summary: 'Get games' })
  @ApiQuery({ name: 'queryParams', type: GetGameQueryParamsDto })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of games',
    type: [PaginationDto<RawgGameResponseDto>],
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGames(@Query() queryParams: GetGameQueryParamsDto) {
    return this.gamesService.getGames(queryParams);
  }

  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({ status: 200, description: 'Returns game details by id' })
  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameById(id);
  }

  @ApiOperation({ summary: 'Get game trailers from YouTube by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns game trailers from YouTube by game ID',
  })
  @Get(':id/yt/trailers')
  async getGameTrailersFromYoutubeByGameId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.youtubeService.getGameTrailersByGameId(id);
  }

  @ApiOperation({ summary: 'Get game video review by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiQuery({ name: 'queryParams', type: GetGameVideoReviewDto })
  @Get(':id/video-review')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGameVideoReviewByGameId(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: GetGameVideoReviewDto,
  ) {
    return this.youtubeService.getGameVideoReviewByGameId(id, queryParams.lang);
  }

  @ApiOperation({ summary: 'Get game stores by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({ status: 200, description: 'Returns game stores by game ID' })
  @Get(':id/stores')
  async getGameStoresById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameStoresByGameId(id);
  }

  @ApiQuery({ name: 'cc', enum: ['pl', 'us'] })
  @Get('steam/bestsellers')
  async getSteamBestSellers(@Query() cc: 'pl' | 'us' = 'pl') {
    return this.steamService.getBestSellers(cc);
  }
}
