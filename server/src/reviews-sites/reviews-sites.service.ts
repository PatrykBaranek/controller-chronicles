import { Injectable } from '@nestjs/common';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { Browser } from 'puppeteer';

@Injectable()
export abstract class ReviewsSitesService<T> {
  protected abstract siteUrl: string;

  abstract getGameReviewById(gameId: number): Promise<T[]>;
  abstract getNewGamesReviews(): Promise<T[]>;

  protected abstract findReviewsForGames(
    games: RawgGameResponseDto[],
  ): Promise<T[]>;

  protected abstract findReviewForGame(
    game: RawgGameResponseDto,
    browser: Browser,
  ): Promise<T[]>;
}
