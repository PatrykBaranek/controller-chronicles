import { Exclude, Transform } from 'class-transformer';

const urlMappings = {
  'https://api.spotify.com/v1/search': 'http://localhost:3000/api/spotify/podcasts',
  'https://api.spotify.com/v1/me/shows': 'http://localhost:3000/api/spotify/podcasts/user/list',
};

export class PagingObjectDto<T> implements SpotifyApi.PagingObject<T> {
  items: T[];

  limit: number;

  offset: number;

  total: number;

  @Transform(({ value }) => replaceNextPrevious(value, urlMappings))
  next: string;

  @Transform(({ value }) => replaceNextPrevious(value, urlMappings))
  previous: string;

  @Exclude()
  href: string;
}

function replaceNextPrevious(href: string, mappings: Record<string, string>) {
  if (!href) return null;

  const baseUrl = href.split('?')[0];
  return mappings[baseUrl] ? `${mappings[baseUrl]}${href.substring(baseUrl.length)}` : null;
}