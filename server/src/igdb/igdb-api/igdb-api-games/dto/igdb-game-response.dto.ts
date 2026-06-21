import { ApiProperty } from '@nestjs/swagger';

class IgdbWebsiteDto {
  @ApiProperty({ description: 'Website URL' })
  url: string;

  @ApiProperty({ description: 'Website category (IGDB website category id)' })
  category: number;
}

class IgdbNamedEntityDto {
  @ApiProperty({ description: 'Entity ID' })
  id: number;

  @ApiProperty({ description: 'Entity name' })
  name: string;

  @ApiProperty({ description: 'Entity slug' })
  slug: string;
}

export class IgdbGameResponseDto {
  @ApiProperty({ description: 'Game ID' })
  id: number;

  @ApiProperty({ description: 'Game slug' })
  slug: string;

  @ApiProperty({ description: 'Game name' })
  name: string;

  @ApiProperty({ description: 'Game description', required: false })
  description?: string;

  @ApiProperty({
    description: 'First release date',
    required: false,
    type: Date,
  })
  firstReleaseDate?: Date;

  @ApiProperty({
    description: 'Aggregated critic rating (0-100)',
    required: false,
  })
  aggregatedRating?: number;

  @ApiProperty({ description: 'Cover image URL', required: false })
  background_image?: string;

  @ApiProperty({
    description: 'Screenshot image URLs',
    required: false,
    type: [String],
  })
  screenshots?: string[];

  @ApiProperty({
    description: 'Official websites',
    required: false,
    type: [IgdbWebsiteDto],
  })
  websites?: IgdbWebsiteDto[];

  @ApiProperty({
    description: 'Genres',
    required: false,
    type: [IgdbNamedEntityDto],
  })
  genres?: IgdbNamedEntityDto[];

  @ApiProperty({
    description: 'Platforms',
    required: false,
    type: [IgdbNamedEntityDto],
  })
  platforms?: IgdbNamedEntityDto[];

  @ApiProperty({
    description: 'Developers',
    required: false,
    type: [IgdbNamedEntityDto],
  })
  developers?: IgdbNamedEntityDto[];

  @ApiProperty({
    description: 'Publishers',
    required: false,
    type: [IgdbNamedEntityDto],
  })
  publishers?: IgdbNamedEntityDto[];
}
