import { getMonth, getYear } from 'date-fns';

import { PuppeteerService } from 'src/puppeteer/services/puppeteer.service';

import { IReviewSiteScraper } from '../interface/IReviewSiteScraper';

import { Game } from 'src/games/models/game.schema';

import { FuseJsCompareService } from 'src/reviews-sites/util/fuse-js-compare.service';
import { ReviewsSitesGameReviewsDto } from 'src/reviews-sites/dto/review-sites.dto';
import { ReviewsSites } from './reviews-sites-scraper-factory';

const SELECTORS = {
  REVIEWS_CONTAINER: '.archive_by_date_items',
  REVIEW_LINKS: 'a',
}

export class EurogamerStrategy implements IReviewSiteScraper {

  private readonly siteUrl: string = 'https://www.eurogamer.net/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly fuseJsCompareService: FuseJsCompareService,
  ) {}

  async scrapeData(game: Game): Promise<ReviewsSitesGameReviewsDto[]> {
    return await this.puppeteerService.withBrowser(async (browser) => {
      const month = getMonth(new Date(game.rawgGame.released)) + 1;
      const year  = getYear(new Date(game.rawgGame.released));

      const page = await this.puppeteerService.createPage(browser, this.siteUrl + `${year}/${month >= 10 ? month : '0' + month}/`);

      const reviewsContainerElement = await page.waitForSelector(SELECTORS.REVIEWS_CONTAINER);
      const reviews = await reviewsContainerElement.$$(SELECTORS.REVIEW_LINKS);

      const reviewsArray = await Promise.all(
        reviews.map(async (review) => {
          return {
            title: await review.evaluate((el) => el.textContent.replace(/\n/g, '').trim()),
            url:   await review.evaluate((el: HTMLAnchorElement) => el.href),
          };
        }),
      );

      const matchedArticles = this.fuseJsCompareService.findBestMatch(game.rawgGame.name, reviewsArray);

      const result = matchedArticles.map(article => ({
        title: article.title,
        url: article.url,
        source: ReviewsSites.EUROGAMER,
      }))

      return result;
    });
  }

}