import { Controller, Get, Param, ParseIntPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { YoutubeService } from './services/youtube.service';
import { TrailerOrReviewRequestDto } from './dto/get-videos-by-date-range.dto';
import { GetGameVideoReviewDto } from './dto/get-game-video-review.dto';

@ApiTags('api/youtube')
@Controller('youtube')
export class YoutubeController {

  constructor(private readonly youtubeService: YoutubeService) {}

  @ApiOperation({ summary: 'Get game video review or by game ID' })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGameVideoReviewByGameId(@Query() { gameId, videoType }: GetGameVideoReviewDto) {
    return this.youtubeService.getGameVideosByGameId(gameId, videoType);
  }

  @ApiOperation({ summary: 'Get game video review by game ID from verify review channels' })
  @ApiParam({ name: 'gameId', description: 'The ID of the game' })
  @Get(':gameId/video-review')
  async getGameVideoReviewByGameIdByAllChannels(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.youtubeService.getGameVideoReviewByGameIdByAllChannels(gameId);
  }

  @Get('/trailer-or-review-by-date-range')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTrailerOrReviewByDateRange(@Query() { fromDate, toDate, videoType, reviewChannels }: TrailerOrReviewRequestDto) {
    return this.youtubeService.getVideosByDateRange(fromDate, toDate, videoType, reviewChannels);
  }
}