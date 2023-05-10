import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { SteamReposiiory } from './steam.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SteamService {
  private readonly logger = new Logger(SteamService.name);

  constructor(
    private readonly steamRepository: SteamReposiiory,
    private readonly puppeteerService: PuppeteerService,
  ) {}

  async getBestSellers() {
    if (await this.checkIfTodaysBestSellersExist()) {
      this.logger.log('Getting bestsellers from DB');
      return this.steamRepository.getBestSellers();
    }

    const bestSellersJson = await this.scrapeBestSellers();

    return bestSellersJson;
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  private async scrapeBestSellers() {
    this.logger.log('Scraping bestsellers from Steam');
    const browser = await this.puppeteerService.launchBrowser();
    try {
      const page = await this.puppeteerService.createPage(
        browser,
        'https://store.steampowered.com/search/?category1=998&os=win%2Cmac%2Clinux&specials=1&hidef2p=1&filter=topsellers&ndl=1&ignore_preferences=1',
      );

      const bestsellersList = await page.waitForSelector('#search_resultsRows');

      const listOfBestSellingGameHTMLElements = await bestsellersList.$$(
        '.ds_collapse_flag',
      );

      const bestSellersJson = await Promise.all(
        listOfBestSellingGameHTMLElements.map(async (gameHTMLElement) => {
          const img = await gameHTMLElement
            .$('img')
            .then((el) => el.evaluate((el) => el.getAttribute('src')));

          const name = await gameHTMLElement
            .$('.title')
            .then((title) => title.evaluate((title) => title.textContent));

          const link = await gameHTMLElement.evaluate((element) =>
            element.getAttribute('href'),
          );

          const price = await gameHTMLElement.$('.search_price').then((el) =>
            el.evaluate((el) => {
              const brElement = el.querySelector('br');
              if (brElement && brElement.nextSibling) {
                return brElement.nextSibling.textContent.trim();
              }
              return null;
            }),
          );

          return {
            img,
            name,
            link,
            price,
          };
        }),
      );

      await this.steamRepository.saveBestSellers({
        games: bestSellersJson,
      });

      return bestSellersJson;
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      await this.puppeteerService.closeBrowser(browser);
    }
  }

  private async checkIfTodaysBestSellersExist() {
    const bestSellers = await this.steamRepository.getBestSellers();

    if (bestSellers.length === 0) {
      return false;
    }

    return true;
  }
}
