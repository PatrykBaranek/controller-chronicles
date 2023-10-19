import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SteamBestSellersService } from './services/steam-bestsellers/steam-bestsellers.service';
import { SteamReviewsService } from './services/steam-reviews/steam-reviews.service';
import { SteamPlayersInGameService } from './services/steam-players-in-game/steam-players-in-game.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api/steam')
@Controller('steam')
export class SteamController {

  constructor(
    private readonly steamBestSellersService: SteamBestSellersService,
    private readonly steamReviewsService: SteamReviewsService,
    private readonly steamPlayersInGameService: SteamPlayersInGameService,
  ) {}


  @ApiOperation({ summary: 'Get steam bestsellers' })
  @Get('bestsellers')
  async getSteamBestSellers() {
    return this.steamBestSellersService.getBestSellers();
  }

  @ApiOperation({ summary: 'Get steam reviews by game ID' })
  @Get(':gameId/reviews')
  async getSteamReviewsByGameId(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.steamReviewsService.getSteamReviewByGameId(gameId);
  }

  @ApiOperation({ summary: 'Get steam players count by game ID' })
  @Get(':gameId/players-count')
  async getSteamPlayersCountByGameId(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.steamPlayersInGameService.getSteamPlayersCountByGameId(gameId);
  }

}
