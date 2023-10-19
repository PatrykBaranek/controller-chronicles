import { Browser } from "puppeteer";
import { RawgGameResponseDto } from "src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto";


export abstract class ReviewsSitesUtil<T> {
  protected abstract siteUrl: string;

  abstract getGameReviewById(gameId: number): Promise<T[]>;

  protected abstract findReviewsForGames(games: RawgGameResponseDto[]): Promise<T[]>;

  protected abstract findReviewForGame(game: RawgGameResponseDto, browser: Browser): Promise<T[]>;
}