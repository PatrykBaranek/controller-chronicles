import { ApiProperty } from '@nestjs/swagger';
import { SpotifyItemObjectDto } from './spotify-item-object.dto';

export class GetUserPodcastsDto {
  @ApiProperty({ description: 'Date the podcast was added to the library' })
  added_at: string;

  @ApiProperty({ description: 'Podcast show details', type: SpotifyItemObjectDto })
  show: SpotifyItemObjectDto;
}
