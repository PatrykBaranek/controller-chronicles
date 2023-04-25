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
import { RawgGameOptionParams } from './types/rawg-game-query-params';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGames(@Query() options: RawgGameOptionParams) {
    return this.gamesService.getGames(options);
  }

  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameById(id);
  }

  @Get(':id/trailers')
  async getGameTrailersById(@Param('id', ParseIntPipe) id: number) {
    return this.getGameTrailersById(id);
  }

  @Get('/developers')
  async getGamesByDeveloper() {
    return this.gamesService.getGamesByDeveloper();
  }
}
