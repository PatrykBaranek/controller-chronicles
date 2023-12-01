import Parser from 'rss-parser';

type FeedResult = {
  name: FeedNames;
  data: any;
}

export enum FeedNames {
  IGN = 'IGN',
  GameSpot = 'GameSpot',
  PlayStation = 'PlayStation',
  Xbox = 'Xbox',
  Kotaku = 'Kotaku',
  GameInformer = 'GameInformer',
  PCGamer = 'PCGamer'
}

const parser = new Parser();

interface IFeedParser {
  parseFeed(): Promise<FeedResult>;
}

export class CompositeFeedParser implements IFeedParser {
  private parsers: IFeedParser[] = [];
  private blacklisted: FeedNames[] = [];

  constructor(blacklisted: FeedNames[]) {
    this.blacklisted = blacklisted;
  }

  addParser(parser: IFeedParser) {
    this.parsers.push(parser);
  }

  async parseFeed(): Promise<any> {
    const results = await Promise.all(this.parsers.map(parser => parser.parseFeed()));
    console.log(this.blacklisted);
    return results.reduce((acc, result) => {
      acc[result.name] = result.data;
      return acc;
    }, {});
  }
}

export class IGNFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('http://feeds.feedburner.com/ign/pc-reviews');
    return { name: FeedNames.IGN, data: data.items };
  }
}

export class GameSpotFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('https://www.gamespot.com/feeds/news/');
    return { name: FeedNames.GameSpot, data: data.items };
  }
}

export class PlayStationFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('https://blog.playstation.com/feed/');
    return { name: FeedNames.PlayStation, data: data.items };
  }
}

export class XboxFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('https://news.xbox.com/en-us/feed/');
    return { name: FeedNames.Xbox, data: data.items };
  }
}

export class KotakuFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('https://kotaku.com/rss');
    return { name: FeedNames.Kotaku, data: data.items };
  }
}

export class GameInformerFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('https://www.gameinformer.com/reviews.xml');
    return { name: FeedNames.GameInformer, data: data.items };
  }
}

export class PcGamerFeedParser implements IFeedParser {
  async parseFeed(): Promise<FeedResult> {
    const data = await parser.parseURL('https://www.pcgamer.com/rss/reviews/');
    return { name: FeedNames.PCGamer, data: data.items };
  }
}