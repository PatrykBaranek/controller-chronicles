import { HttpException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getMonth, getYear } from 'date-fns';
import { Browser } from 'puppeteer';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';
import { ReviewsSitesService } from '../reviews-sites.service';
import { ReviewSitesGameReviewsDto } from '../dto/review-sites.dto';
import { FuzzyCompareService } from '../fuzzy-compare.service';

@Injectable()
export class ReviewsSitesGameradarService extends ReviewsSitesService<ReviewSitesGameReviewsDto> {
  siteUrl: string = 'https://www.gamesradar.com/reviews/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly rawgGamesService: RawgGamesService,
    private readonly fuzzyCompareService: FuzzyCompareService,
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
    const month = getMonth(new Date(game.released)) + 1;
    const year = getYear(new Date(game.released));
    const page = await this.puppeteerService.createPage(
      browser,
      this.siteUrl + `${year}/${month}/`,
    );

    const reviewsContainerElement = await page.waitForSelector('.archive');
    const reviews = await reviewsContainerElement.$$('a');
    const reviewsArray = await Promise.all(
      reviews.map(async (review) => {
        return {
          title: await review.evaluate((el) =>
            el.textContent.replace(/\n/g, ''),
          ),
          url: await review.evaluate((el) => el.href),
        };
      }),
    );

    const matchedArticles = this.fuzzyCompareService.findBestMatch(
      game.name,
      reviewsArray,
    );

    return plainToInstance(ReviewSitesGameReviewsDto, matchedArticles);
  }
}
