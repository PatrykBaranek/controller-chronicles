import { Injectable } from '@nestjs/common';

import { FuseJsCompareService } from 'src/reviews-sites/util/fuse-js-compare.service';
import { PuppeteerService } from 'src/puppeteer/services/puppeteer.service';

import { GamesradarStrategy } from './gamesradar-strategy';
import { EurogamerStrategy } from './eurogamer-strategy';

export enum ReviewsSites {
  EUROGAMER = 'eurogamer',
  GAMESRADAR = 'gamesradar',
};

@Injectable()
export class ReviewsSitesScraperFactory {
  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly fuseJsCompareService: FuseJsCompareService,
  ) {}

  createScraper(type: ReviewsSites) {
    switch (type) {
      case ReviewsSites.EUROGAMER:
        return new EurogamerStrategy(this.puppeteerService, this.fuseJsCompareService);
      case ReviewsSites.GAMESRADAR:
        return new GamesradarStrategy(this.puppeteerService, this.fuseJsCompareService);
      default:
        throw new Error('Invalid scraper type');
    }
  }
}