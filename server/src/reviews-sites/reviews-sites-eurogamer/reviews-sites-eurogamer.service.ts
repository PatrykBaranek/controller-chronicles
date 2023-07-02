import { Injectable } from '@nestjs/common';
import { ReviewsSitesService } from '../reviews-sites.service';
import { Browser } from 'puppeteer';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { ReviewSitesGameReviewsDto } from '../dto/review-sites.dto';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';
import { plainToInstance } from 'class-transformer';
import { getMonth, getYear } from 'date-fns';
import { FuzzyCompareService } from '../fuzzy-compare.service';

@Injectable()
export class ReviewsSitesEurogamerService extends ReviewsSitesService<ReviewSitesGameReviewsDto> {
  protected siteUrl: string = 'https://www.eurogamer.net/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly rawgGamesService: RawgGamesService,
    private readonly fuzzyCompareService: FuzzyCompareService,
  ) {
    super();
  }

  async getGameReviewById(
    gameId: number,
  ): Promise<ReviewSitesGameReviewsDto[]> {
    const game = await this.rawgGamesService.getGameById(gameId);

    return await this.findReviewsForGames(
      plainToInstance(RawgGameResponseDto, [game.rawgGame]),
    );
  }

  protected async findReviewsForGames(
    games: RawgGameResponseDto[],
  ): Promise<ReviewSitesGameReviewsDto[]> {
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
      this.siteUrl + `${year}/${month > 10 ? month : '0' + month}/`,
    );

    const reviewsContainerElement = await page.waitForSelector(
      '.archive_by_date_items',
    );
    const reviews = await reviewsContainerElement.$$('a');
    const reviewsArray = await Promise.all(
      reviews.map(async (review) => {
        return {
          title: await review.evaluate((el) =>
            el.textContent.replace(/\n/g, '').trim(),
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
