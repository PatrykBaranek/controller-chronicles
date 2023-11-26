import { Injectable } from '@nestjs/common';
import { ReviewsSites, ReviewsSitesScraperFactory } from './strategies/reviews-sites-scraper-factory';
import { GamesService } from 'src/games/services/games.service';
import { GamesRepository } from 'src/games/database/games.repository';
import { Game } from 'src/games/models/game.schema';

@Injectable()
export class ReviewsSitesService {

  constructor(
    private readonly reviewsSitesScraperFactory: ReviewsSitesScraperFactory,
    private readonly gamesService: GamesService,
    private readonly gamesRepository: GamesRepository,
  ) { }

  async getReviewsFromAllSites(gameId: number) {
    const game = await this.gamesService.getGameById(gameId);

    if (game.reviews_sites) {
      return game.reviews_sites;
    }

    const reviewSites = Object.values(ReviewsSites);

    const reviews = await Promise.all(reviewSites.map(type => this.getReviews(game, type)));

    await this.gamesRepository.updateGame(gameId, { reviews_sites: reviews.flat() });

    return reviews.flat();
  }

  private async getReviews(game: Game, reviewSite: ReviewsSites) {
    return await this.reviewsSitesScraperFactory.createScraper(reviewSite).scrapeData(game);
  }
}