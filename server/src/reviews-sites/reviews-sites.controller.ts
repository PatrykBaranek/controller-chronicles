import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsSitesGameradarService } from './reviews-sites-gameradar/reviews-sites-gameradar.service';
import { ReviewsSitesEurogamerService } from './reviews-sites-eurogamer/reviews-sites-eurogamer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reviews-sites')
@Controller('reviews-sites')
export class ReviewsSitesController {
  constructor(
    private readonly gameradarService: ReviewsSitesGameradarService,
    private readonly eurogamerService: ReviewsSitesEurogamerService,
  ) {}

  @Get('gamesradar/:id')
  async getGameReviewByIdFromGameradar(@Param('id') id: number) {
    return this.gameradarService.getGameReviewById(id);
  }

  @Get('gamesradar/new-games-reviews')
  async getNewGamesReviewsFromGameradar() {
    return this.gameradarService.getNewGamesReviews();
  }

  @Get('eurogamer/:id')
  async getGameReviewByIdFromEurogamer(@Param('id') id: number) {
    return this.eurogamerService.getGameReviewById(id);
  }
}
