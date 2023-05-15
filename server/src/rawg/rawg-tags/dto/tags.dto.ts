import { Exclude } from 'class-transformer';

export class TagsDto {
  id: number;
  name: string;
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
