import { ApiProperty } from '@nestjs/swagger';

export class SearchResultDto {
  @ApiProperty({ description: 'The ID of the game the video belongs to' })
  game_id: number;

  @ApiProperty({ description: 'Video title' })
  title: string;

  @ApiProperty({ description: 'Video thumbnail URL' })
  thumbnail: string;

  @ApiProperty({ description: 'Video channel/author name' })
  author: string;

  @ApiProperty({ description: 'Video link' })
  link: string;
}
