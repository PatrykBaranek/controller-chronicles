import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { RawgGameResponseDto } from 'src/rawg/rawg-games/dto/rawg-game-response.dto';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';

@Injectable()
export class ReviewsSitesGameradarService {
  siteUrl: string = 'https://www.gameradar.com/reviews';

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly rawgGamesService: RawgGamesService,
  ) {}

  async getNewGamesReviewsById() {
    const newGameReleases = await this.rawgGamesService.getNewReleases({
      page: 1,
      page_size: 5,
    });

    await this.getNewGamesReviews(newGameReleases.results);
  }

  private async getNewGamesReviews(newReleasedGames: RawgGameResponseDto[]) {
    const browser = await this.puppeteerService.launchBrowser();
    try {
      const page = await this.puppeteerService.createPage(
        browser,
        this.siteUrl,
      );
    } catch (err) {
    } finally {
    }
  }
}
