import { Exclude } from 'class-transformer';

export class RawgGenreDto {
  id: number;
  name: string;
  slug: string;

  @Exclude()
  games_count: number;

  @Exclude()
  image_background: string;

  @Exclude()
  games: any[];
}
