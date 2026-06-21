import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const urlMappings = {
  'https://api.spotify.com/v1/search':
    'http://localhost:3000/api/spotify/podcasts',
  'https://api.spotify.com/v1/me/shows':
    'http://localhost:3000/api/spotify/podcasts/user/list',
};

export class PagingObjectDto<T> implements SpotifyApi.PagingObject<T> {
  @ApiProperty({ description: 'Items for the current page' })
  items: T[];

  @ApiProperty({ description: 'Maximum number of items returned per page' })
  limit: number;

  @ApiProperty({ description: 'Offset of the items returned' })
  offset: number;

  @ApiProperty({ description: 'Total number of items available' })
  total: number;

  @ApiProperty({ description: 'URL to the next page of items', required: false })
  @Transform(({ value }) => replaceNextPrevious(value, urlMappings))
  next: string;

  @ApiProperty({
    description: 'URL to the previous page of items',
    required: false,
  })
  @Transform(({ value }) => replaceNextPrevious(value, urlMappings))
  previous: string;

  @Exclude()
  href: string;
}

function replaceNextPrevious(href: string, mappings: Record<string, string>) {
  if (!href) return null;

  const baseUrl = href.split('?')[0];
  return mappings[baseUrl]
    ? `${mappings[baseUrl]}${href.substring(baseUrl.length)}`
    : null;
}
