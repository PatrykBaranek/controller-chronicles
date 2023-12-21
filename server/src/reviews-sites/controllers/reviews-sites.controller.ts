import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsSitesService } from '../services/reviews-sites.service';


@ApiTags('api/reviews-sites')
@Controller('reviews-sites')
export class ReviewsSitesController {
  constructor(
    private readonly reviewsSitesService: ReviewsSitesService,
  ) { }

  @Get(':gameId')
  async getReviews(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.reviewsSitesService.getReviewsFromAllSites(gameId);
  }
}
