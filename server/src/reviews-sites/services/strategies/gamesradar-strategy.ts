import { getMonth, getYear } from 'date-fns';

import { IReviewSiteScraper } from '../interface/IReviewSiteScraper';

import { Game } from 'src/games/models/game.schema';

import { PuppeteerService } from 'src/puppeteer/services/puppeteer.service';

import { FuseJsCompareService } from 'src/reviews-sites/util/fuse-js-compare.service';
import { ReviewsSitesGameReviewsDto } from 'src/reviews-sites/dto/review-sites.dto';
import { ReviewsSites } from './reviews-sites-scraper-factory';

const SELECTORS = {
  REVIEWS_CONTAINER: '.archive',
  REVIEW_LINKS: 'a',
};

export class GamesradarStrategy implements IReviewSiteScraper {
  private readonly siteUrl: string =
    'https://www.gamesradar.com/reviews/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly fuseJsCompareService: FuseJsCompareService,
  ) {}

  scrapeData(game: Game): Promise<ReviewsSitesGameReviewsDto[]> {
    return this.puppeteerService.withBrowser(async (browser) => {
      const releaseDate = game.igdbGame.firstReleaseDate ?? new Date();
      const month = getMonth(releaseDate) + 1;
      const year = getYear(releaseDate);

      const page = await this.puppeteerService.createPage(
        browser,
        this.siteUrl + `${year}/${month}/`,
      );

      const reviewsContainerElement = await page.waitForSelector(
        SELECTORS.REVIEWS_CONTAINER,
      );
      if (!reviewsContainerElement) {
        return [];
      }
      const reviews = await reviewsContainerElement.$$(SELECTORS.REVIEW_LINKS);

      const reviewsArray = await Promise.all(
        reviews.map(async (review) => {
          return {
            title: await review.evaluate((el) =>
              el.textContent.replace(/\n/g, ''),
            ),
            url: await review.evaluate((el: HTMLAnchorElement) => el.href),
          };
        }),
      );

      const matchedArticles = this.fuseJsCompareService.findBestMatch(
        game.igdbGame.name,
        reviewsArray,
      );

      const result = matchedArticles.map((article) => ({
        title: article.title,
        url: article.url,
        source: ReviewsSites.GAMESRADAR,
      }));

      return result;
    });
  }
}
