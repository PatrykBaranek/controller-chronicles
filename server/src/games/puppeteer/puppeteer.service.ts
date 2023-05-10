import * as puppeteer from 'puppeteer';

export class PuppeteerService {
  async launchBrowser(): Promise<puppeteer.Browser> {
    return puppeteer.launch({ headless: 'new' });
  }

  async createPage(
    browser: puppeteer.Browser,
    url: string,
  ): Promise<puppeteer.Page> {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    return page;
  }

  async closeBrowser(browser: puppeteer.Browser): Promise<void> {
    await browser.close();
  }
}
