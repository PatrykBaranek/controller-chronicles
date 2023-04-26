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
import { GetGameVideoReviewDto } from './dto/get-game-video-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetGameDto } from './dto/get-game.dto';

@ApiTags('Games Api')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGames(@Query() queryParams: GetGameDto) {
    return this.gamesService.getGames(queryParams);
  }

  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameById(id);
  }

  @Get(':id/trailers')
  async getGameTrailersById(@Param('id', ParseIntPipe) id: number) {
    return this.getGameTrailersById(id);
  }

  @Get(':title/video-review')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGameVideoReviewByTitle(
    @Param('title') title: string,
    @Query() queryParams: GetGameVideoReviewDto,
  ) {
    return this.gamesService.getGameVideoReviewByTitle(title, queryParams.lang);
  }

  @Get('/developers')
  async getGamesByDeveloper() {
    return this.gamesService.getGamesByDeveloper();
  }
}
