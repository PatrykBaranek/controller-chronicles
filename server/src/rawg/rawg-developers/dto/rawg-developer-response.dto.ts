import { ApiProperty } from '@nestjs/swagger';
import { RawgDeveloperResponse } from 'src/rawg/types/rawg-developer-response';

export class RawgDeveloperResponseDto implements RawgDeveloperResponse {
  @ApiProperty({ description: 'Developer ID' })
  id: number;

  @ApiProperty({ description: 'Developer name' })
  name: string;

  @ApiProperty({ description: 'Developer slug' })
  slug: string;

  @ApiProperty({ description: 'Number of games by this developer' })
  games_count: number;

  @ApiProperty({ description: 'Background image URL' })
  image_background: string;
}
