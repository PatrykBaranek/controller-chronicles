import { Injectable } from '@nestjs/common';
import { ReviewSitesGameReviewsDto } from './dto/review-sites.dto';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { Browser, Page } from 'puppeteer';

@Injectable()
export abstract class ReviewsSitesService {
  protected abstract siteUrl: string;

  abstract getGameReviewById(
    gameId: number,
  ): Promise<ReviewSitesGameReviewsDto[]>;
  abstract getNewGamesReviews(): Promise<ReviewSitesGameReviewsDto[]>;

  protected abstract findReviewsForGames(
    games: RawgGameResponseDto[],
  ): Promise<ReviewSitesGameReviewsDto[]>;

  protected abstract findReviewForGame(
    game: RawgGameResponseDto,
    browser: Browser,
  ): Promise<ReviewSitesGameReviewsDto[]>;
}
