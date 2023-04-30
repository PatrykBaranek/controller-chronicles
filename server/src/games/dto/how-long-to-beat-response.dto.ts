import { Exclude } from 'class-transformer';
import { HowLongToBeatEntry } from 'howlongtobeat';

export class HowLongToBeatResponseDto implements HowLongToBeatEntry {
  @Exclude()
  id: string;

  name: string;
  gameplayMain: number;
  gameplayMainExtra: number;
  gameplayCompletionist: number;

  @Exclude()
  description: string;

  @Exclude()
  platforms: string[];

  @Exclude()
  imageUrl: string;

  @Exclude()
  timeLabels: string[][];

  @Exclude()
  similarity: number;

  @Exclude()
  searchTerm: string;

  @Exclude()
  playableOn: string[];
}
