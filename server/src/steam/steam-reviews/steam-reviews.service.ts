import { Injectable, NotFoundException } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';
import { SteamReposiiory } from '../steam.repository';
import { ElementHandle, Page } from 'puppeteer';

@Injectable()
export class SteamReviewsService {
  constructor(
    private readonly rawgGamesService: RawgGamesService,
    private readonly puppeteerService: PuppeteerService,
    private readonly steamRepository: SteamReposiiory,
  ) {}

  async getSteamReviewByGameId(id: number) {
    const stores = await this.rawgGamesService.getGameStoresByGameId(id);

    if (!stores.some((store) => store.name === 'Steam')) {
      throw new NotFoundException('Game is not available on Steam');
    }

    const steamUrl = stores.find((store) => store.name === 'Steam').url;

    const scrapedData = await this.scrapeSteamReviews(steamUrl);

    console.log(scrapedData);

    this.steamRepository.saveReviews({
      ...scrapedData,
      game_id: id,
    });

    return {
      ...scrapedData,
      game_id: id,
    };
  }

  private async scrapeSteamReviews(url: string) {
    const browser = await this.puppeteerService.launchBrowser();
    try {
      const page = await this.puppeteerService.createPage(browser, url);

      await this.checkIfApproveAgeGateButtonExists(page);

      const reviewsContainerElement = await page.waitForSelector(
        '#userReviews',
      );

      const reviewsSummaryElements = await reviewsContainerElement.$$(
        '.user_reviews_summary_row',
      );

      const reviewsSummaryFrom30DaysElement = await reviewsSummaryElements[0].$(
        '.summary.column',
      );

      const reviewsSummaryOverallElement = await reviewsSummaryElements[1].$(
        '.summary.column',
      );

      const steamReviewsFrom30DaysResult = await this.getSteamReviewsHelper(
        reviewsSummaryFrom30DaysElement,
        page,
        '30Days',
      );

      const steamReviewsOverallResult = await this.getSteamReviewsHelper(
        reviewsSummaryOverallElement,
        page,
        'Overall',
      );

      return {
        ...steamReviewsFrom30DaysResult,
        ...steamReviewsOverallResult,
      };
    } catch (err) {
    } finally {
      await this.puppeteerService.closeBrowser(browser);
    }
  }

  private async getSteamReviewsHelper(
    reviewsSummaryElement: ElementHandle<Element>,
    page: Page,
    reviewType: '30Days' | 'Overall',
  ) {
    const gameReviewSummaryElement = await reviewsSummaryElement.$(
      '.game_review_summary',
    );

    const gameReviewSummaryText = await page.evaluate(
      (el) => el.textContent,
      gameReviewSummaryElement,
    );

    const usersCountElement = await reviewsSummaryElement.$(
      '.responsive_hidden',
    );

    const userCountText = await page.evaluate(
      (el) => el.textContent.trim().replace(/[\(\)]/g, ''),
      usersCountElement,
    );

    if (reviewType === '30Days') {
      return {
        reviewsSummaryFrom30Days: {
          usersCount: userCountText,
          textSummary: gameReviewSummaryText,
        },
      };
    }

    return {
      reviewsSummaryOverall: {
        usersCount: userCountText,
        textSummary: gameReviewSummaryText,
      },
    };
  }

  private async checkIfApproveAgeGateButtonExists(page: Page) {
    const approveAgeGateButton = await page.$('.age_gate');

    if (approveAgeGateButton === null) {
      return;
    }

    await page.select('#ageYear', '1990');
    await page.click('#view_product_page_btn');
  }
}
