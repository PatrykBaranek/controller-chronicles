import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer';
import { HowLongToBeatService as HLTBService, HowLongToBeatEntry } from 'howlongtobeat';

import { PuppeteerService } from 'src/puppeteer/services/puppeteer.service';

import { HowLongToBeatResponseDto } from '../dto/how-long-to-beat-response.dto';

const SELECTORS = {
  searchResults: '#search-results-header ul',
  gameTitle: 'h3 a',
  gameplayTime: '.GameCard_search_list_tidbit__0r_OP',
};

@Injectable()
export class HowLongToBeatService {
  private readonly logger = new Logger(HowLongToBeatService.name);
  private HLTB_SEARCH_URL: string = 'https://howlongtobeat.com/?q=';
  private readonly hltbService: HLTBService;

  constructor(private readonly puppeteerService: PuppeteerService) {
    this.hltbService = new HLTBService();
  }

  async getGameByName(gameName: string): Promise<Partial<HowLongToBeatResponseDto>> {
    try {
      this.logger.log(`Searching for ${gameName} in HLTB API`);
      const hltbGame = await this.hltbService.search(gameName);

      return this.mapHltbGameToResponseDto(hltbGame[0]);
    } catch (err) {
      this.logger.log('Game not found in HLTB API, scraping game details');
      return this.scrapeGameDetails(gameName);
    }
  }

  private mapHltbGameToResponseDto(hltbGame: HowLongToBeatEntry): HowLongToBeatResponseDto {
    return {
      name: hltbGame.name,
      gameplayMain: hltbGame.gameplayMain,
      gameplayMainExtra: hltbGame.gameplayMainExtra,
      gameplayCompletionist: hltbGame.gameplayCompletionist,
    };
  }

  private async scrapeGameDetails(gameName: string): Promise<Partial<HowLongToBeatResponseDto>> {
    return this.puppeteerService.withBrowser(async (browser) => {
      const page = await this.puppeteerService.createPage(browser, this.HLTB_SEARCH_URL + gameName);

      const HltbSearchResults = await this.getSearchResults(page);

      for (const result of HltbSearchResults) {
        const HltbGameTitle = await this.getGameTitle(result);

        if (!this.isMatchingGame(HltbGameTitle, gameName)) {
          return { notFoundOnHltb: true };
        }

        return this.getGameDetails(result, HltbGameTitle);
      }

      return { notFoundOnHltb: true };
    });
  }

  private isMatchingGame(title: string, gameName: string): boolean {
    return title.toLocaleLowerCase().includes(gameName.toLocaleLowerCase());
  }

  private async getSearchResults(page: Page): Promise<ElementHandle<HTMLLIElement>[]> {
    const HltbSearchResultsElement = await page.waitForSelector(SELECTORS.searchResults);

    return HltbSearchResultsElement.$$('li');
  }

  private async getGameTitle(result: ElementHandle<HTMLLIElement>): Promise<string> {
    return result.$eval(SELECTORS.gameTitle, (el) => el.textContent);
  }

  private async getGameDetails(result: ElementHandle<HTMLLIElement>, HltbGameTitle: string): Promise<HowLongToBeatResponseDto> {
    const gameplayTimeElements = await this.getGameplayTimeElements(result);

    const gameplayMain = this.parseOrZero(gameplayTimeElements[0]);
    const gameplayMainExtra = this.parseOrZero(gameplayTimeElements[1]);
    const gameplayCompletionist = this.parseOrZero(gameplayTimeElements[2]);

    return {
      name: HltbGameTitle,
      gameplayMain,
      gameplayMainExtra,
      gameplayCompletionist,
    };
  }

  private async getGameplayTimeElements(result: ElementHandle<HTMLLIElement>): Promise<number[]> {
    return result
      .$$eval(SELECTORS.gameplayTime, (els) =>
        els.map((el, i) => {
          if ((i + 1) % 2 === 0) {
            const gameplayTime = el.textContent.split(' ')[0];
            if (gameplayTime.includes('½')) {
              return Number(gameplayTime.replace('½', '.5'));
            }
            return isNaN(Number(gameplayTime)) ? null : Number(gameplayTime);
          }
          return null;
        })
      )
      .then((times) => times.filter((time) => time !== null));
  }

  private parseOrZero(value: any): number {
    return isNaN(value) ? 0 : Number(value);
  }
}
