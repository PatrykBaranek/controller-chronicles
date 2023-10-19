import { Injectable, Scope } from '@nestjs/common';
import { ReviewsSitesEurogamerService } from './reviews-sites-eurogamer/reviews-sites-eurogamer.service';
import { ReviewsSitesGamesradarService } from './reviews-sites-gamesradar/reviews-sites-gamesradar.service';

@Injectable()
export class ReviewsSitesService {

  constructor(
    private readonly reviewsSitesEurogamerService: ReviewsSitesEurogamerService,
    private readonly reviewsSitesGameradarService: ReviewsSitesGamesradarService,
  ) { }

  async getReviews(gameId: number) {
    const eurogamerReviews  = await this.getEurogamerReviews(gameId);
    const gamesradarReviews = await this.getGamesradarReviews(gameId);

    const result = [...eurogamerReviews, ...gamesradarReviews];

    return result;
  }

  async getEurogamerReviews(gameId: number) {
    return this.reviewsSitesEurogamerService.getGameReviewById(gameId);
  }

  async getGamesradarReviews(gameId: number) {
    return this.reviewsSitesGameradarService.getGameReviewById(gameId);
  }
}
