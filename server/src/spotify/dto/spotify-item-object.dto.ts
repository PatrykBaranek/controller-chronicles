import { Exclude } from 'class-transformer';

export class SpotifyItemObjectDto implements SpotifyApi.ShowObjectSimplified {
  id: string;
  copyrights: SpotifyApi.CopyrightObject[];
  description: string;
  explicit: boolean;
  images: SpotifyApi.ImageObject[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  total_episodes?: number;
  external_urls: SpotifyApi.ExternalUrlObject;

  @Exclude()
  uri: string;

  @Exclude()
  html_description: string;

  @Exclude()
  available_markets: string[];

  @Exclude()
  href: string;
}
