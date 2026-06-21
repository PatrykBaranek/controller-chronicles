import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { GetGameQueryParamsDto } from 'src/games/dto/get-game-query-params.dto';
import { GamesService } from '../services/games.service';

import { PaginationDto } from 'src/app/common/dto/pagination.dto';

import { IgdbGameResponseDto } from 'src/igdb/igdb-api/igdb-api-games/dto/igdb-game-response.dto';
import { IgdbGameSingleResponseDto } from 'src/igdb/igdb-api/igdb-api-games/dto/igdb-game-single-response.dto';

@ApiTags('api/games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Get games' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of games',
    type: [PaginationDto<IgdbGameResponseDto>],
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @AllowAnonymous()
  @Get()
  async getGames(@Query() queryParams: GetGameQueryParamsDto) {
    return this.gamesService.getGames(queryParams);
  }

  @ApiOperation({ summary: 'Get game by id' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns game details by id',
    type: IgdbGameSingleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @AllowAnonymous()
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

  @ApiOperation({ summary: 'Force update game by id' })
  @ApiParam({ name: 'id', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns game details by id',
    type: IgdbGameSingleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Post(':id/update')
  async forceUpdateGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.forceUpdateGameById(id);
  }
}
