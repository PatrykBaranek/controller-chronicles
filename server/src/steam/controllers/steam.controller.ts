import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SteamBestSellersService } from '../services/steam-bestsellers/steam-bestsellers.service';
import { SteamReviewsService } from '../services/steam-reviews/steam-reviews.service';
import { SteamPlayersInGameService } from '../services/steam-players-in-game/steam-players-in-game.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SteamBestSellers } from '../models/steam-bestsellers.schema';
import { SteamReviewsDto } from '../dto/steam-reviews.dto';
import { SteamPlayersCountInGameDto } from '../dto/steam-players-in-game.dto';

@ApiTags('api/steam')
@Controller('steam')
export class SteamController {

  constructor(
    private readonly steamBestSellersService: SteamBestSellersService,
    private readonly steamReviewsService: SteamReviewsService,
    private readonly steamPlayersInGameService: SteamPlayersInGameService,
  ) {}


  @ApiOperation({ summary: 'Get steam bestsellers' })
  @ApiResponse({ status: 200, description: 'Steam bestsellers', type: SteamBestSellers })
  @Get('bestsellers')
  async getSteamBestSellers() {
    return this.steamBestSellersService.getBestSellers();
  }

  @ApiOperation({ summary: 'Get steam reviews by game ID' })
  @ApiParam({ name: 'gameId', description: 'Game ID', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Steam reviews', type: SteamReviewsDto })
  @Get(':gameId/reviews')
  async getSteamReviewsByGameId(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.steamReviewsService.getSteamReviewByGameId(gameId);
  }

  @ApiOperation({ summary: 'Get steam players count by game ID' })
  @ApiParam({ name: 'gameId', description: 'Game ID', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Steam players count', type: SteamPlayersCountInGameDto })
  @Get(':gameId/players-count')
  async getSteamPlayersCountByGameId(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.steamPlayersInGameService.getSteamPlayersCountByGameId(gameId);
  }

}
