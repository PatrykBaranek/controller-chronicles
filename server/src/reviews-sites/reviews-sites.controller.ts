import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsSitesGameradarService } from './reviews-sites-gameradar/reviews-sites-gameradar.service';

@Controller('reviews-sites')
export class ReviewsSitesController {
  constructor(
    private readonly gameradarService: ReviewsSitesGameradarService,
  ) {}

  @Get('gamesradar/:id')
  async getGameReviewByIdFromGameradar(@Param('id') id: number) {
    return this.gameradarService.getGameReviewById(id);
  }

  @Get('gameradar/new-games-reviews')
  async getNewGamesReviewsFromGameradar() {
    return this.gameradarService.getNewGamesReviews();
  }
}
