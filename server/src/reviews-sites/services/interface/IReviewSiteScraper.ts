import { Game } from 'src/games/models/game.schema';
import { ReviewsSitesGameReviewsDto } from 'src/reviews-sites/dto/review-sites.dto';

export interface IReviewSiteScraper {
  scrapeData(game: Game): Promise<ReviewsSitesGameReviewsDto[]>;
}