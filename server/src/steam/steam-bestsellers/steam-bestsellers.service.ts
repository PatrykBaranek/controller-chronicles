import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PuppeteerService } from '../../puppeteer/puppeteer.service';
import { SteamRepository } from '../steam.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SteamBestSellers } from '../models/steam-bestsellers.schema';
import { SteamUtilityService } from '../util/steam-utility.service';

const SELECTORS = {
  bestSellersList: '#search_resultsRows',
  game: '.search_result_row',
  img: 'img',
  title: '.title',
  link: 'a',
  price: '.discount_final_price',
}

@Injectable()
export class SteamBestSellersService {
  private readonly logger = new Logger(SteamBestSellersService.name);
  private readonly steamBestsellersUrl = 'https://store.steampowered.com/search/?ignore_preferences=1&category1=998&os=win%2Cmac%2Clinux&hidef2p=1&filter=topsellers&ndl=1';

  constructor(
    private readonly steamRepository: SteamRepository,
    private readonly steamUtilityService: SteamUtilityService,
    private readonly puppeteerService: PuppeteerService,
  ) { }

  async getBestSellers() {
    try {
      if (await this.steamUtilityService.checkIfTodaysBestSellersExist()) {
        this.logger.log('Getting bestsellers from DB');
        return this.steamRepository.getBestSellers();
      }
      const bestSellersJson = await this.scrapeBestSellers();
      
      return bestSellersJson;
    } catch (err) {
      this.logger.error('Error while scraping bestsellers from Steam', err);
      throw new NotFoundException();
    }
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  private async scrapeBestSellers(): Promise<SteamBestSellers> {
    this.logger.log('Scraping bestsellers from Steam');
    return this.puppeteerService.withBrowser(async (browser) => {
      const page = await this.puppeteerService.createPage(browser, this.steamBestsellersUrl);

      const bestsellersList = await page.waitForSelector(SELECTORS.bestSellersList);

      const listOfBestSellingGameHTMLElements = await bestsellersList.$$(SELECTORS.game);

      const bestSellingGamesFromSteam = await Promise.all(
        listOfBestSellingGameHTMLElements.map(async (gameHTMLElement) => {
          const img = await gameHTMLElement
            .$(SELECTORS.img)
            .then((el) => el.evaluate((el) => el.getAttribute('src')))
            .catch((err) => { 
              this.logger.error('Error while getting img from Steam', err);
              return '';
            });

          const name = await gameHTMLElement
            .$(SELECTORS.title)
            .then((title) => title.evaluate((title) => title.textContent))
            .catch((err) => {
              this.logger.error('Error while getting title from Steam', err);
              return '';
            });

          const link = await gameHTMLElement
            .evaluate(el => el.getAttribute('href'))
            .catch(err => {
              this.logger.error('Error while getting link from Steam', err);
              return '';
            });

          return {
            img,
            name,
            link,
          };
        }),
      );

      const bestSellers: SteamBestSellers = {
        games: bestSellingGamesFromSteam,
      };

      await this.steamRepository.saveBestSellers({
        games: bestSellingGamesFromSteam,
      });

      return bestSellers;
    });
  }
}
