import { Injectable } from '@nestjs/common';
import Fuse from 'fuse.js';

type ReviewData = {
  title: string;
  url: string;
};

@Injectable()
export class FuseJsCompareService {
  private fuse: Fuse<ReviewData>;

  constructor() {
    this.fuse = new Fuse([], {
      keys: ['title'],
      threshold: 0.1,
      includeScore: true,
    });
  }

  findBestMatch(gameName: string, reviews: ReviewData[]) {
    this.fuse.setCollection(reviews);
    const searchQuery = `${gameName} review`;
    const result = this.fuse.search(searchQuery);

    const bestMatches = result.map((match) => match.item);

    return bestMatches;
  }
}