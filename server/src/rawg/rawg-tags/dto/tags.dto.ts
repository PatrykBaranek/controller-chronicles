import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagsDto {
  @ApiProperty({ description: 'Tag ID' })
  id: number;

  @ApiProperty({ description: 'Tag name' })
  name: string;

  @ApiProperty({ description: 'Tag slug' })
  slug: string;

  @Exclude()
  games_count: number;

  @Exclude()
  image_background: string;

  @Exclude()
  language: string;

  @Exclude()
  games: any[];
}
