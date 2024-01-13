import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsSitesService } from '../services/reviews-sites.service';
import { ReviewsSites } from '../models/reviews-sites.schema';


@ApiTags('api/reviews-sites')
@Controller('reviews-sites')
export class ReviewsSitesController {
  constructor(private readonly reviewsSitesService: ReviewsSitesService) { }

  @ApiOperation({ summary: 'Get reviews from all sites by game ID' })
  @ApiResponse({ type: ReviewsSites })
  @Get(':gameId')
  async getReviews(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.reviewsSitesService.getReviewsFromAllSites(gameId);
  }
}
