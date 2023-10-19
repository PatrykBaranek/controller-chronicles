import { Injectable, NotFoundException } from '@nestjs/common';
import fuzzysort from 'fuzzysort';

@Injectable()
export class FuzzyCompareService {
  findBestMatch(gameName: string, reviews: { title: string; url: string }[]) {
    const result = fuzzysort.go(gameName, reviews, {
      keys: ['title'],
      threshold: -Infinity,
    });

    if (result.total !== 0) {
      const bestMatches = result.map((match) => match.obj);
      return bestMatches;
    }

    throw new NotFoundException('No found reviews');
  }
}
