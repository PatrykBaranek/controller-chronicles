import { HttpException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

export class PuppeteerService {
  async createPage(
    browser: puppeteer.Browser,
    url: string,
  ): Promise<puppeteer.Page> {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    return page;
  }

  async withBrowser<T>(
    fn: (browser: puppeteer.Browser) => Promise<T>,
  ): Promise<T> {
    const browser = await this.launchBrowser();
    try {
      return await fn(browser);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    } finally {
      await this.closeBrowser(browser);
    }
  }

  private async launchBrowser(): Promise<puppeteer.Browser> {
    return puppeteer.launch({ headless: false });
  }

  private async closeBrowser(browser: puppeteer.Browser): Promise<void> {
    await browser.close();
  }
}
