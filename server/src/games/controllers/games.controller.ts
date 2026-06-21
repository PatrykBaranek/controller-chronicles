import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetGameQueryParamsDto } from 'src/games/dto/get-game-query-params.dto';
import { GamesService } from '../services/games.service';

import { PaginationDto } from 'src/rawg/helpers/dto/pagination.dto';

import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';
import { RawgGameSingleResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-single-response.dto';

@ApiTags('api/games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Get games' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of games',
    type: [PaginationDto<RawgGameResponseDto>],
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @Get()
  async getGames(@Query() queryParams: GetGameQueryParamsDto) {
    return this.gamesService.getGames(queryParams);
  }

  @ApiOperation({ summary: 'Get game by id' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns game details by id',
    type: RawgGameSingleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameById(id);
  }

  @ApiOperation({ summary: 'Update game reviews embargo date' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({
    status: 201,
    description: 'Manualy set game review embargo date',
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Post(':id/embargo-date')
  async setEmbargeDate(
    @Param('id', ParseIntPipe) id: number,
    @Query('date') date: Date,
  ) {
    return this.gamesService.setGameReviewEmbargoDate(id, date);
  }

  @ApiOperation({ summary: 'Get game stores by game ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({ status: 200, description: 'Returns game stores by game ID' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':id/stores')
  async getGameStoresById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameStoresByGameId(id);
  }

  @ApiOperation({ summary: 'Force update game by id' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns game details by id',
    type: RawgGameSingleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Post(':id/update')
  async forceUpdateGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.forceUpdateGameById(id);
  }
}
