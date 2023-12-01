import { Controller, Get, Query } from '@nestjs/common';
import { RssService } from './rss.service';
import { FeedNames } from './composite/FeedParsers';
import { RssDto } from './dto/rss.dto';

@Controller('rss')
export class RssController {

  constructor(private readonly rssService: RssService) { }

  @Get()
  async getIGNFeed(@Query() rssDto: RssDto) {
    const { blacklisted } = rssDto;

    const blackl = 'IGN,GameSpot';
    console.log(blacklisted)
    console.log(blackl.split(','));
    console.log(Object.values(FeedNames))
    const blacklistedFeeds = blacklisted
      ? blackl.split(',').filter(feed => Object.values(FeedNames).includes(feed as FeedNames))
      : [];

    return await this.rssService.parseFeed(blacklistedFeeds as FeedNames[]);
  }
}
