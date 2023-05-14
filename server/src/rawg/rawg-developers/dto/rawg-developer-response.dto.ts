import { RawgDeveloperResponse } from 'src/rawg/types/rawg-developer-response';

export class RawgDeveloperResponseDto implements RawgDeveloperResponse {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
