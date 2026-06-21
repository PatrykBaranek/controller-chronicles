import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SteamBestSellersService } from '../services/steam-bestsellers/steam-bestsellers.service';
import { SteamReviewsService } from '../services/steam-reviews/steam-reviews.service';
import { SteamPlayersInGameService } from '../services/steam-players-in-game/steam-players-in-game.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { SteamReviewsDto } from '../dto/steam-reviews.dto';
import { SteamPlayersCountInGameDto } from '../dto/steam-players-in-game.dto';

@ApiTags('api/steam')
@Controller('steam')
@AllowAnonymous()
export class SteamController {
  constructor(
    private readonly steamBestSellersService: SteamBestSellersService,
    private readonly steamReviewsService: SteamReviewsService,
    private readonly steamPlayersInGameService: SteamPlayersInGameService,
  ) {}

  @ApiOperation({ summary: 'Get steam bestsellers' })
  @ApiResponse({ status: 200, description: 'Returns the Steam bestsellers list' })
  @Get('bestsellers')
  async getSteamBestSellers() {
    return this.steamBestSellersService.getBestSellers();
  }

  @ApiOperation({ summary: 'Get steam reviews by game ID' })
  @ApiParam({ name: 'gameId', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns Steam reviews for the game',
    type: SteamReviewsDto,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':gameId/reviews')
  async getSteamReviewsByGameId(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.steamReviewsService.getSteamReviewByGameId(gameId);
  }

  @ApiOperation({ summary: 'Get steam players count by game ID' })
  @ApiParam({ name: 'gameId', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current Steam player count for the game',
    type: SteamPlayersCountInGameDto,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':gameId/players-count')
  async getSteamPlayersCountByGameId(
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.steamPlayersInGameService.getSteamPlayersCountByGameId(gameId);
  }
}
