import { Controller, Delete, Get, HttpCode, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { YoutubeService } from '../services/youtube.service';

import { GetVideosByDateRangeDto } from '../dto/get-videos-by-date-range.dto';
import { GetGameVideoReviewDto } from '../dto/get-game-video-review.dto';
import { DeleteVideoDto } from '../dto/delete-video.dto';

@ApiTags('api/youtube')
@Controller('youtube')
export class YoutubeController {

  constructor(private readonly youtubeService: YoutubeService) {}

  @ApiOperation({ summary: 'Get game video reviews or trailers by game ID' })
  @ApiQuery({ type: GetGameVideoReviewDto })
  @Get()
  async getGameVideoReviewByGameId(@Query() getGameVideoReviewDto: GetGameVideoReviewDto) {
    return this.youtubeService.getGameVideosByGameId(getGameVideoReviewDto);
  }

  @ApiOperation({ summary: 'Get game video review or trailers by date range' })
  @Get('videos/date-range')
  async getTrailerOrReviewByDateRange(@Query() getVideosByDateRangeDto: GetVideosByDateRangeDto) {
    return this.youtubeService.getVideosByDateRange(getVideosByDateRangeDto);
  }

  @ApiOperation({ summary: 'Delete game video review or trailers by video ID' })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVideo(@Query() deleteVideoDto: DeleteVideoDto) {
    return this.youtubeService.deleteVideo(deleteVideoDto);
  }
}