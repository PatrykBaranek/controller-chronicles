import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RawgGamesService } from './rawg-games.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';

import { PaginationDto } from '../helpers/dto/pagination.dto';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';
import { YoutubeService } from 'src/youtube/youtube.service';
import { SteamBestSellersService } from 'src/steam/steam-bestsellers/steam-bestsellers.service';
import { GetGameVideoReviewDto } from 'src/youtube/dto/get-game-video-review.dto';
import { SteamReviewsService } from 'src/steam/steam-reviews/steam-reviews.service';
import { PageQueryParamsDto } from './dto/page-query-params.dto';

@ApiTags('games')
@Controller('games')
export class RawgGamesController {
  constructor(
    private readonly gamesService: RawgGamesService,
    private readonly youtubeService: YoutubeService,
    private readonly steamBestSellersService: SteamBestSellersService,
    private readonly steamReviewsService: SteamReviewsService,
  ) {}

  @ApiOperation({ summary: 'Get games' })
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

  @Post('new-releases')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getNewReleases(@Query() queryParams: PageQueryParamsDto) {
    return this.gamesService.getNewReleases(queryParams);
  }

  @ApiOperation({ summary: 'Get steam bestsellers' })
  @Get('steam/bestsellers')
  async getSteamBestSellers() {
    return this.steamBestSellersService.getBestSellers();
  }

  @ApiOperation({ summary: 'Get steam reviews by game ID' })
  @Get(':id/steam/reviews')
  async getSteamReviewsByGameId(@Param('id', ParseIntPipe) id: number) {
    return this.steamReviewsService.getSteamReviewByGameId(id);
  }
}
