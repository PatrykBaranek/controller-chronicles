import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer';
import { plainToInstance } from 'class-transformer';

import { GamesService } from 'src/games/games.service';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';

import { SteamUtilityService } from '../util/steam-utility.service';
import { SteamRepository } from '../steam.repository';
import { SteamReviewsDto } from '../dto/steam-reviews.dto';

type ReviewType = '30Days' | 'Overall';

const SELECTORS = {
  reviewsContainer: '#userReviews',
  reviewsSummary: '.user_reviews_summary_row',
  gameReviewsSummaryColumn: '.summary.column',
  gameReviewsSummary: '.game_review_summary',
  usersCount: '.responsive_hidden',
  positivePercentage: '.nonresponsive_hidden.responsive_reviewdesc'
}

@Injectable()
export class SteamReviewsService {
  constructor(
    private readonly gamesService: GamesService,
    private readonly puppeteerService: PuppeteerService,
    private readonly steamRepository: SteamRepository,
    private readonly steamUtilityService: SteamUtilityService,
  ) {}

  async getSteamReviewByGameId(id: number): Promise<SteamReviewsDto> {
    const game = await this.gamesService.getGameById(id);

    await this.steamUtilityService.checkIfGameIsReleased(game);

    const steamUrl = await this.steamUtilityService.getSteamUrlByGameId(id);

    const scrapedData = await this.scrapeSteamReviews(steamUrl);

    this.steamRepository.saveReviews({
      game_id: id,
      reviewsSummaryFrom30Days: scrapedData.reviewsSummaryFrom30Days,
      reviewsSummaryOverall: scrapedData.reviewsSummaryOverall,
      updatedAt: new Date(),
    });

    return plainToInstance(SteamReviewsDto, scrapedData);
  }

  private async scrapeSteamReviews(url: string): Promise<SteamReviewsDto> {
    return this.puppeteerService.withBrowser(async (browser) => {
      const page = await this.puppeteerService.createPage(browser, url);

      await this.steamUtilityService.checkIfApproveAgeGateButtonExists(page);

      const reviewsContainerElement = await page.waitForSelector(SELECTORS.reviewsContainer);

      const isOnlyOneReview = await this.steamUtilityService.checkIfOnlyOneReviewExists(reviewsContainerElement);

      const reviewsSummaryElements = await reviewsContainerElement.$$(SELECTORS.reviewsSummary);

      if (isOnlyOneReview) {
        const reviewsSummaryOverallResult = await this.fetchReviewSummary(reviewsSummaryElements[0], page, 'Overall');

        return { ...reviewsSummaryOverallResult };
      } else {
        const reviewsSummaryFrom30DaysResult = await this.fetchReviewSummary(reviewsSummaryElements[0], page, '30Days');
        const reviewsSummaryOverallResult = await this.fetchReviewSummary(reviewsSummaryElements[1], page, 'Overall');

        return { ...reviewsSummaryFrom30DaysResult, ...reviewsSummaryOverallResult };
      }
    });
  }

  private async getSteamReviewsHelper(reviewsSummaryElement: ElementHandle<Element>, page: Page, reviewType: ReviewType): Promise<SteamReviewsDto> {
    const gameReviewSummaryElement = await reviewsSummaryElement.$(SELECTORS.gameReviewsSummary);
    const gameReviewSummaryText = await this.steamUtilityService.extractTextContent(page, gameReviewSummaryElement);

    const usersCountElement = await reviewsSummaryElement.$(SELECTORS.usersCount);
    const usersCountRawText = await this.steamUtilityService.extractTextContent(page, usersCountElement);
    const usersCountText = usersCountRawText.trim().replace(/[\(\)]/g, '');
    const usersCount = Number(usersCountText.split(',').join(''));

    const positivePercentageElement = await reviewsSummaryElement.$(SELECTORS.positivePercentage);
    const positivePercentageRawText = await this.steamUtilityService.extractTextContent(page, positivePercentageElement);
    const positivePercentage = Number(positivePercentageRawText.split('%')[0].replace('- ', ''))

    const reviewsSummary = {
      usersCount: usersCount,
      textSummary: gameReviewSummaryText,
      positivePercentage: positivePercentage,
    }

    return reviewType === '30Days' 
    ? { reviewsSummaryFrom30Days: reviewsSummary }
    : { reviewsSummaryOverall: reviewsSummary };
  }

  private async fetchReviewSummary(element: ElementHandle<Element>, page: Page, reviewType: ReviewType): Promise<SteamReviewsDto> {
    const reviewSummaryElement = await element.$(SELECTORS.gameReviewsSummaryColumn);
    return this.getSteamReviewsHelper(reviewSummaryElement, page, reviewType);
  }
}
