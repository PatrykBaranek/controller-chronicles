import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString } from 'class-validator';
import { VideoType } from '../util/youtube-utility.service';

export class GetGameVideoReviewDto {
  @ApiProperty({
    description: 'Game ID',
    required: true,
    type: Number,
  })
  @IsNumberString()
  gameId: number;

  @ApiProperty({
    description: 'Video type',
    required: true,
    enum: [
      VideoType.REVIEW,
      VideoType.TRAILER,
    ],
  })
  @IsIn([VideoType.REVIEW, VideoType.TRAILER])
  videoType: VideoType;
}
