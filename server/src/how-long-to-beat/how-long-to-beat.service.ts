import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { HowLongToBeatResponseDto } from './dto/how-long-to-beat-response.dto';
import { ElementHandle, Page } from 'puppeteer';

const SELECTORS = {
  searchResults: '#search-results-header ul',
  gameTitle: 'h3 a',
  gameplayTime: '.GameCard_search_list_tidbit__ldrz4',
};

@Injectable()
export class HowLongToBeatService {
  private HLTB_SEARCH_URL: string = 'https://howlongtobeat.com/?q=';

  constructor(private readonly puppeteerService: PuppeteerService) {}

  async getGameByName(gameName: string): Promise<HowLongToBeatResponseDto> {
    return this.puppeteerService.withBrowser(async (browser) => {
      const page = await this.puppeteerService.createPage(
        browser,
        this.HLTB_SEARCH_URL + gameName,
      );

      const HltbSearchResults = await this.getSearchResults(page);

      for (const result of HltbSearchResults) {
        const HltbGameTitle = await this.getGameTitle(result);

        if (
          HltbGameTitle.toLocaleLowerCase().includes(
            gameName.toLocaleLowerCase(),
          )
        ) {
          return await this.getGameDetails(result, HltbGameTitle);
        }
      }
    });
  }

  async getSearchResults(page: Page): Promise<ElementHandle<HTMLLIElement>[]> {
    const HltbSearchResultsElement = await page.waitForSelector(
      SELECTORS.searchResults,
    );
    return await HltbSearchResultsElement.$$('li');
  }

  async getGameTitle(result: ElementHandle<HTMLLIElement>): Promise<string> {
    return await result.$eval(SELECTORS.gameTitle, (el) => el.textContent);
  }

  async getGameDetails(
    result: ElementHandle<HTMLLIElement>,
    HltbGameTitle: string,
  ): Promise<HowLongToBeatResponseDto> {
    const gameplayTimeElements = await result
      .$$eval(SELECTORS.gameplayTime, (els) =>
        els.map((el, i) => {
          if ((i + 1) % 2 === 0) {
            const gameplayTime = el.textContent.split(' ')[0];
            if (gameplayTime.includes('½')) {
              return Number(gameplayTime.replace('½', '.5'));
            }
            if (!isNaN(Number(gameplayTime))) return Number(gameplayTime);
          }
        }),
      )
      .then((times) => times.filter((time) => time !== null));

    const gameplayMain = Number(gameplayTimeElements[0]);
    const gameplayMainExtra = Number(gameplayTimeElements[1]);
    const gameplayCompletionist = Number(gameplayTimeElements[2]);

    return {
      name: HltbGameTitle,
      gameplayMain,
      gameplayMainExtra,
      gameplayCompletionist,
    };
  }
}
