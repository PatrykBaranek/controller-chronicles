import { ApiProperty } from '@nestjs/swagger';

export class IgdbGenreDto {
  @ApiProperty({ description: 'Genre ID' })
  id: number;

  @ApiProperty({ description: 'Genre name' })
  name: string;

  @ApiProperty({ description: 'Genre slug' })
  slug: string;
}
