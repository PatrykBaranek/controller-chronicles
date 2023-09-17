import { Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetGameVideoReviewDto } from 'src/youtube/dto/get-game-video-review.dto';
import { GetGameQueryParamsDto } from 'src/games/dto/get-game-query-params.dto';
import { GamesService } from './services/games.service';
import { GamesUpdateService } from '../games-update/services/games-update.service';

import { PaginationDto } from 'src/rawg/helpers/dto/pagination.dto';

import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';

import { SteamBestSellersService } from 'src/steam/steam-bestsellers/steam-bestsellers.service';
import { SteamPlayersInGameService } from 'src/steam/steam-in-game/steam-players-in-game.service';
import { SteamReviewsService } from 'src/steam/steam-reviews/steam-reviews.service';

import { YoutubeService } from 'src/youtube/services/youtube.service';


@ApiTags('api/games')
@Controller('api/games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly steamBestSellersService: SteamBestSellersService,
    private readonly steamReviewsService: SteamReviewsService,
    private readonly steamPlayersInGameService: SteamPlayersInGameService,
    private readonly youtubeService: YoutubeService,
  ) { }

  @ApiOperation({ summary: 'Get games' })
  @ApiResponse({ status: 200, description: 'Returns a list of games', type: [PaginationDto<RawgGameResponseDto>] })
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

  @ApiOperation({ summary: 'Update game reviews embargo date'})
  @ApiResponse({ status: 201, description: 'Manualy set game review embargo date' })
  @Post(':id/embarge-date')
  async setEmbargeDate(@Param('id', ParseIntPipe) id: number, @Query('date') date: Date) {
    return this.gamesService.setGameReviewEmbargoDate(id, date);
  }

  @ApiOperation({ summary: 'Get game trailers from YouTube by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({ status: 200, description: 'Returns game trailers from YouTube by game ID' })
  @Get(':id/yt/trailers')
  async getGameTrailersFromYoutubeByGameId(@Param('id', ParseIntPipe) id: number) {
    return this.youtubeService.getGameTrailersByGameId(id);
  }

  @ApiOperation({ summary: 'Get game video review by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @Get(':id/video-review')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGameVideoReviewByGameId(@Param('id', ParseIntPipe) id: number, @Query() queryParams: GetGameVideoReviewDto) {
    return this.youtubeService.getGameVideoReviewByGameId(id, queryParams.lang);
  }

  @ApiOperation({ summary: 'Get game stores by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({ status: 200, description: 'Returns game stores by game ID' })
  @Get(':id/stores')
  async getGameStoresById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameStoresByGameId(id);
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

  @ApiOperation({ summary: 'Get steam players count by game ID' })
  @Get(':id/steam/players-count')
  async getSteamPlayersCountByGameId(@Param('id', ParseIntPipe) id: number) {
    return this.steamPlayersInGameService.getSteamPlayersCountByGameId(id);
  }
}
