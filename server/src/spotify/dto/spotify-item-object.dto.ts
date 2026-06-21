import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SpotifyItemObjectDto implements SpotifyApi.ShowObjectSimplified {
  @ApiProperty({ description: 'Spotify show ID' })
  id: string;

  @ApiProperty({ description: 'Copyright statements for the show' })
  copyrights: SpotifyApi.CopyrightObject[];

  @ApiProperty({ description: 'Show description' })
  description: string;

  @ApiProperty({ description: 'Whether the show contains explicit content' })
  explicit: boolean;

  @ApiProperty({ description: 'Cover art images for the show' })
  images: SpotifyApi.ImageObject[];

  @ApiProperty({ description: 'Whether the show is hosted outside Spotify' })
  is_externally_hosted: boolean;

  @ApiProperty({ description: 'Languages used in the show', type: [String] })
  languages: string[];

  @ApiProperty({ description: 'Media type of the show' })
  media_type: string;

  @ApiProperty({ description: 'Show name' })
  name: string;

  @ApiProperty({ description: 'Show publisher' })
  publisher: string;

  @ApiProperty({ description: 'Object type, always "show"' })
  type: 'show';

  @ApiProperty({ description: 'Total number of episodes', required: false })
  total_episodes?: number;

  @ApiProperty({ description: 'External URLs for the show' })
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
