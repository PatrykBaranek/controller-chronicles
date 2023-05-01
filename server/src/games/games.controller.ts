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
import { ApiTags } from '@nestjs/swagger';
import { GetGameQueryParamsDto } from './dto/get-game-query-params.dto';
import { YoutubeService } from './youtube/youtube.service';

@ApiTags('Games Api')
@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGames(@Query() queryParams: GetGameQueryParamsDto) {
    return this.gamesService.getGames(queryParams);
  }

  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameById(id);
  }

  @Get(':id/trailers')
  async getGameTrailersById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameTrailersById(id);
  }

  @Get(':title/video-review')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGameVideoReviewByTitle(
    @Param('title') title: string,
    @Query() queryParams: GetGameVideoReviewDto,
  ) {
    return this.youtubeService.getGameVideoReviewByTitle(
      title,
      queryParams.lang,
    );
  }

  @Get(':id/stores')
  async getGameStoresById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getGameStoresByGameId(id);
  }
}
