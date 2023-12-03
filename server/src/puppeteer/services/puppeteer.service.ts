import { HttpException, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

const TIMEOUT = 20_000;

@Injectable()
export class PuppeteerService {
  async createPage(browser: puppeteer.Browser, url: string): Promise<puppeteer.Page> {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
    return page;
  }

  async withBrowser<T>(fn: (browser: puppeteer.Browser) => Promise<T>): Promise<T> {
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
    try {
      return await puppeteer.launch({ headless: 'new', timeout: TIMEOUT });
    } catch (err) {
      throw new HttpException(`Failed to launch browser: ${err.message}`, 500);
    }
  }

  private async closeBrowser(browser: puppeteer.Browser): Promise<void> {
    await browser.close();
  }
}
