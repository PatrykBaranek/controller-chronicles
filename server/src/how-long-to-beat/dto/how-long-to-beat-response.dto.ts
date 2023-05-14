import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HowLongToBeatEntry } from 'howlongtobeat';

export class HowLongToBeatResponseDto implements HowLongToBeatEntry {
  @ApiProperty()
  name: string;

  @ApiProperty()
  gameplayMain: number;

  @ApiProperty()
  gameplayMainExtra: number;

  @ApiProperty()
  gameplayCompletionist: number;

  @Exclude()
  id: string;

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
