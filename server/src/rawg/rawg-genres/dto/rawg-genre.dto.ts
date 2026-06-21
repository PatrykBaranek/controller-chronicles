import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RawgGenreDto {
  @ApiProperty({ description: 'Genre ID' })
  id: number;

  @ApiProperty({ description: 'Genre name' })
  name: string;

  @ApiProperty({ description: 'Genre slug' })
  slug: string;

  @Exclude()
  games_count: number;

  @Exclude()
  image_background: string;

  @Exclude()
  games: any[];
}
