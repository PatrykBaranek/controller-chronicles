import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PuppeteerService } from '../puppeteer/puppeteer.service';

@Injectable()
export class SteamService {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  async getBestSellers(cc: 'pl' | 'us') {
    const browser = await this.puppeteerService.launchBrowser();
    try {
      const page = await this.puppeteerService.createPage(
        browser,
        'https://store.steampowered.com/search/?category1=998&os=win%2Cmac%2Clinux&specials=1&hidef2p=1&filter=topsellers&ndl=1&cc=' +
          cc,
      );

      const bestsellersList = await page.waitForSelector('#search_resultsRows');

      const listOfBestSellingGameHTMLElements = await bestsellersList.$$(
        '.ds_collapse_flag',
      );

      return await Promise.all(
        listOfBestSellingGameHTMLElements.map(async (gameHTMLElement) => {
          const img = await gameHTMLElement
            .$('img')
            .then((el) => el.evaluate((el) => el.getAttribute('src')));

          const gameTitle = await gameHTMLElement
            .$('.title')
            .then((title) => title.evaluate((title) => title.textContent));
          const steamLink = await gameHTMLElement.evaluate((element) =>
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
            gameTitle,
            steamLink,
            price,
          };
        }),
      );
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await this.puppeteerService.closeBrowser(browser);
    }
  }
}
