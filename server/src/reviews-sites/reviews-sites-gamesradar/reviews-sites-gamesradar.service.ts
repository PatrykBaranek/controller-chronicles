import { Injectable }         from '@nestjs/common';
import { plainToInstance }    from 'class-transformer';
import { getMonth, getYear }  from 'date-fns';
import { Browser }            from 'puppeteer';

import { PuppeteerService }    from 'src/puppeteer/services/puppeteer.service';

import { RawgGameResponseDto } from 'src/rawg/rawg-api/rawg-api-games/dto/rawg-game-response.dto';

import { ReviewsSitesUtil }          from '../util/reviews-sites-util.service';
import { ReviewSitesGameReviewsDto } from '../dto/review-sites.dto';
import { FuzzyCompareService }       from '../util/fuzzy-compare.service';

import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class ReviewsSitesGamesradarService extends ReviewsSitesUtil<ReviewSitesGameReviewsDto> {
  protected siteUrl: string = 'https://www.gamesradar.com/reviews/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly gamesService: GamesService,
    private readonly fuzzyCompareService: FuzzyCompareService,
  ) {
    super();
  }

  async getGameReviewById(gameId: number): Promise<ReviewSitesGameReviewsDto[]> {
    const game = await this.gamesService.getGameById(gameId);

    return this.findReviewsForGames(plainToInstance(RawgGameResponseDto, [game.rawgGame]));
  }

  protected async findReviewsForGames(games: RawgGameResponseDto[]): Promise<ReviewSitesGameReviewsDto[]> {
    return await this.puppeteerService.withBrowser(async (browser) => {
      return (await Promise.all(games.map(game => this.findReviewForGame(game, browser)))).flat();
    });
  }

  protected async findReviewForGame(game: RawgGameResponseDto, browser: Browser) {

    const month = getMonth(new Date(game.released)) + 1;
    const year  = getYear(new Date(game.released));

    const page = await this.puppeteerService.createPage(browser, this.siteUrl + `${year}/${month}/`);

    const reviewsContainerElement = await page.waitForSelector('.archive');
    const reviews = await reviewsContainerElement.$$('a');

    const reviewsArray = await Promise.all(
      reviews.map(async (review) => {
        return {     
          title: await review.evaluate((el) => el.textContent.replace(/\n/g, '')),
          url:   await review.evaluate((el) => el.href),
        };
      }),
    );

    const matchedArticles = this.fuzzyCompareService.findBestMatch(game.name, reviewsArray);

    return plainToInstance(ReviewSitesGameReviewsDto, matchedArticles);
  }
}
