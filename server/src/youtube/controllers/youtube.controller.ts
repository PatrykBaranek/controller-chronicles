import { Controller, Delete, Get, HttpCode, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { YoutubeService } from '../services/youtube.service';

import { GetVideosByDateRangeDto } from '../dto/get-videos-by-date-range.dto';
import { GetGameVideoReviewDto } from '../dto/get-game-video-review.dto';
import { DeleteVideoDto } from '../dto/delete-video.dto';

@ApiTags('api/youtube')
@Controller('youtube')
export class YoutubeController {

  constructor(private readonly youtubeService: YoutubeService) {}

  @ApiOperation({ summary: 'Get game video review or by game ID' })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGameVideoReviewByGameId(@Query() getGameVideoReviewDto: GetGameVideoReviewDto) {
    return this.youtubeService.getGameVideosByGameId(getGameVideoReviewDto);
  }

  @Get('videos/date-range')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTrailerOrReviewByDateRange(@Query() getVideosByDateRangeDto: GetVideosByDateRangeDto) {
    return this.youtubeService.getVideosByDateRange(getVideosByDateRangeDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteVideo(@Query() deleteVideoDto: DeleteVideoDto) {
    return this.youtubeService.deleteVideo(deleteVideoDto);
  }
}