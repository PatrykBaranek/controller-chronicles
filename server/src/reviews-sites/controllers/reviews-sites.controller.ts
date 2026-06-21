import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsSitesService } from '../services/reviews-sites.service';
import { ReviewsSitesGameReviewsDto } from '../dto/review-sites.dto';

@ApiTags('api/reviews-sites')
@Controller('reviews-sites')
export class ReviewsSitesController {
  constructor(private readonly reviewsSitesService: ReviewsSitesService) {}

  @ApiOperation({ summary: 'Get reviews for a game from all review sites' })
  @ApiParam({ name: 'gameId', description: 'The ID of the game' })
  @ApiResponse({
    status: 200,
    description: 'Returns reviews for the game from all review sites',
    type: [ReviewsSitesGameReviewsDto],
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @Get(':gameId')
  async getReviews(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.reviewsSitesService.getReviewsFromAllSites(gameId);
  }
}
