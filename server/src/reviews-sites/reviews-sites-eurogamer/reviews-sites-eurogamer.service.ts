import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsSitesService } from '../reviews-sites.service';
import { Browser } from 'puppeteer';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { ReviewSitesGameReviewsEuroGamerDto } from '../dto/review-sites.dto';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';
import { plainToInstance } from 'class-transformer';
import { getMonth, getYear } from 'date-fns';

@Injectable()
export class ReviewsSitesEurogamerService extends ReviewsSitesService<ReviewSitesGameReviewsEuroGamerDto> {
  protected siteUrl: string = 'https://www.eurogamer.net/archive/';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly rawgGamesService: RawgGamesService,
  ) {
    super();
  }

  async getGameReviewById(
    gameId: number,
  ): Promise<ReviewSitesGameReviewsEuroGamerDto[]> {
    const game = await this.rawgGamesService.getGameById(gameId);

    return await this.findReviewsForGames(
      plainToInstance(RawgGameResponseDto, [game.rawgGame]),
    );
  }

  getNewGamesReviews(): Promise<ReviewSitesGameReviewsEuroGamerDto[]> {
    throw new Error('Method not implemented.');
  }

  protected async findReviewsForGames(
    games: RawgGameResponseDto[],
  ): Promise<ReviewSitesGameReviewsEuroGamerDto[]> {
    return await this.puppeteerService.withBrowser(async (browser) => {
      let result: ReviewSitesGameReviewsEuroGamerDto[] = [];
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
    const result: ReviewSitesGameReviewsEuroGamerDto[] = [];
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
    for (const review of reviews) {
      const reviewText = await review.evaluate((el) => el.textContent);
      if (reviewText.includes(game.name)) {
        result.push({
          game_id: game.id,
          eurogamerReview: {
            title: reviewText.trim(),
            url: await review.evaluate((el) => el.href),
          },
        });
      }
    }

    if (result.length === 0) {
      throw new NotFoundException('No found reviews');
    }

    return result;
  }
}
