import { Injectable, Logger } from '@nestjs/common';

import { CompositeFeedParser, FeedNames }    from './composite/FeedParsers';
import { XboxFeedParser }         from './composite/FeedParsers';
import { PlayStationFeedParser }  from './composite/FeedParsers';
import { IGNFeedParser }          from './composite/FeedParsers';
import { GameSpotFeedParser }     from './composite/FeedParsers';
import { KotakuFeedParser }       from './composite/FeedParsers';
import { GameInformerFeedParser } from './composite/FeedParsers';
import { PcGamerFeedParser }      from './composite/FeedParsers';


@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);

  constructor() {}

  async parseFeed(blacklisted: FeedNames[]) {
    this.logger.log('Parsing RSS feeds...');
    const compositeParser = new CompositeFeedParser(blacklisted);

    compositeParser.addParser(new IGNFeedParser());
    compositeParser.addParser(new GameSpotFeedParser());
    compositeParser.addParser(new PlayStationFeedParser());
    compositeParser.addParser(new XboxFeedParser());
    compositeParser.addParser(new KotakuFeedParser());
    compositeParser.addParser(new GameInformerFeedParser());
    compositeParser.addParser(new PcGamerFeedParser());

    const result = await compositeParser.parseFeed();

    return result;
  }
}
