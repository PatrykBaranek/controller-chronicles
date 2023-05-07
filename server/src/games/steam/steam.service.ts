import { Injectable, Scope } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable({ scope: Scope.TRANSIENT })
export class SteamService {
  constructor() {}

  async getBestSellers(lang: 'polish' | 'english') {
    const curency = lang === 'polish' ? 'pl' : 'usd';

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(
      'https://store.steampowered.com/search/?category1=998&os=win%2Cmac%2Clinux&specials=1&hidef2p=1&filter=topsellers&ndl=1&c=' +
        curency,
      { waitUntil: 'networkidle2' },
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

        console.log({
          img,
          gameTitle,
          steamLink,
          price,
        });

        return {
          img,
          gameTitle,
          steamLink,
          price,
        };
      }),
    );
  }
}
