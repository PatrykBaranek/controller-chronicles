import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getMonth, getYear } from 'date-fns';
import { Browser } from 'puppeteer';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';
import { ReviewsSitesService } from '../reviews-sites.service';
import { ReviewSitesGameReviewsDto } from '../dto/review-sites.dto';

@Injectable()
export class ReviewsSitesGameradarService extends ReviewsSitesService {
  siteUrl: string = 'https://www.gamesradar.com/reviews/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly rawgGamesService: RawgGamesService,
  ) {
    super();
  }

  async getGameReviewById(gameId: number) {
    try {
      const game = await this.rawgGamesService.getGameById(gameId);

      return this.findReviewsForGames(
        plainToInstance(RawgGameResponseDto, [game.rawgGame]),
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async getNewGamesReviews() {
    const newGameReleases = await this.rawgGamesService.getNewReleases({
      page: 1,
      page_size: 10,
    });

    return this.findReviewsForGames(newGameReleases.results);
  }

  protected async findReviewsForGames(games: RawgGameResponseDto[]) {
    return await this.puppeteerService.withBrowser(async (browser) => {
      let result: ReviewSitesGameReviewsDto[] = [];
      for (const game of games) {
        result.push(...(await this.findReviewForGame(game, browser)));
      }
      return result;
    });
  }

  protected async findReviewForGame(
    game: RawgGameResponseDto,
    browser: Browser,
  ) {
    const result: ReviewSitesGameReviewsDto[] = [];
    const month = getMonth(new Date(game.released)) + 1;
    const year = getYear(new Date(game.released));
    const page = await this.puppeteerService.createPage(
      browser,
      this.siteUrl + `${year}/${month}/`,
    );

    const reviewsContainerElement = await page.waitForSelector('.archive');
    const reviews = await reviewsContainerElement.$$('a');
    for (const review of reviews) {
      const reviewText = await review.evaluate((el) => el.textContent);
      if (reviewText.includes(game.name)) {
        result.push({
          game_id: game.id,
          gameradarReview: {
            title: reviewText,
            url: await review.evaluate((el) => el.href),
          },
        });
        break;
      }
    }

    if (result.length === 0) {
      throw new NotFoundException('No found reviews');
    }

    return result;
  }
}
