import { Injectable, NotFoundException } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { SteamReposiiory } from '../steam.repository';
import { ElementHandle, Page } from 'puppeteer';
import { GamesService } from 'src/games/games.service';

type SteamReviewsResultsType = {
  reviewsSummaryFrom30Days?: {
    usersCount: number;
    textSummary: string;
  };
  reviewsSummaryOverall?: {
    usersCount: number;
    textSummary: string;
  };
};

@Injectable()
export class SteamReviewsService {
  constructor(
    private readonly gamesService: GamesService,
    private readonly puppeteerService: PuppeteerService,
    private readonly steamRepository: SteamReposiiory,
  ) {}

  async getSteamReviewByGameId(id: number) {
    const game = await this.gamesService.getGameById(id);

    if (game.rawgGame.released === null) {
      throw new NotFoundException('Game is not released yet');
    }

    const steamUrl = await this.getSteamUrlByGameId(id);

    const scrapedData = await this.scrapeSteamReviews(steamUrl);

    this.steamRepository.saveReviews({
      game_id: id,
      reviewsSummaryFrom30Days: scrapedData.reviewsSummaryFrom30Days,
      reviewsSummaryOverall: scrapedData.reviewsSummaryOverall,
      updatedAt: new Date(),
    });

    return {
      ...scrapedData,
      game_id: id,
    };
  }

  private async getSteamUrlByGameId(id: number) {
    const stores = await this.gamesService.getGameStoresByGameId(id);

    if (!stores.some((store) => store.name === 'Steam')) {
      throw new NotFoundException('Game is not available on Steam');
    }

    return stores.find((store) => store.name === 'Steam').url;
  }

  private async scrapeSteamReviews(
    url: string,
  ): Promise<SteamReviewsResultsType> {
    return this.puppeteerService.withBrowser(async (browser) => {
      const page = await this.puppeteerService.createPage(browser, url);

      await this.checkIfApproveAgeGateButtonExists(page);

      const reviewsContainerElement = await page.waitForSelector(
        '#userReviews',
      );

      const isOnlyOneReview = await this.checkIfOnlyOneReviewExists(
        reviewsContainerElement,
      );

      const reviewsSummaryElements = await reviewsContainerElement.$$(
        '.user_reviews_summary_row',
      );

      let steamReviewsResult: SteamReviewsResultsType;

      if (isOnlyOneReview) {
        const reviewsSummaryOverallElement = await reviewsSummaryElements[0].$(
          '.summary.column',
        );

        steamReviewsResult = {
          ...(await this.getSteamReviewsHelper(
            reviewsSummaryOverallElement,
            page,
            'Overall',
          )),
        };
      } else {
        const reviewsSummaryFrom30DaysElement =
          await reviewsSummaryElements[0].$('.summary.column');

        const reviewsSummaryOverallElement = await reviewsSummaryElements[1].$(
          '.summary.column',
        );

        steamReviewsResult = {
          ...(await this.getSteamReviewsHelper(
            reviewsSummaryFrom30DaysElement,
            page,
            '30Days',
          )),
          ...(await this.getSteamReviewsHelper(
            reviewsSummaryOverallElement,
            page,
            'Overall',
          )),
        };
      }

      return steamReviewsResult;
    });
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
          usersCount: Number(userCountText.replace(',', '')),
          textSummary: gameReviewSummaryText,
        },
      };
    }

    return {
      reviewsSummaryOverall: {
        usersCount: Number(userCountText.replace(',', '')),
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

  private async checkIfOnlyOneReviewExists(
    reviewsContainerElement: ElementHandle<Element>,
  ) {
    const childrenCount = await reviewsContainerElement.evaluate((el) => {
      return el.children.length;
    });

    return childrenCount === 1 ? true : false;
  }
}
