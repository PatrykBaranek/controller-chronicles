import { IsEnum, IsNotEmpty, IsBooleanString, Matches } from 'class-validator';
import { VideoType } from '../services/youtube.service';
import { ApiProperty } from '@nestjs/swagger';

export class TrailerOrReviewRequestDto {
  @ApiProperty({
    description: 'From date',
    format: 'YYYY-MM-DD',
    required: true,
    type: String
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'fromDate must be in YYYY-MM-DD format'
  })
  @IsNotEmpty()
  fromDate: string;

  @ApiProperty({
    description: 'To date',
    format: 'YYYY-MM-DD',
    required: true,
    type: String
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'fromDate must be in YYYY-MM-DD format'
  })
  @IsNotEmpty()
  toDate: string;

  @ApiProperty({
    description: 'Video type',
    required: true,
    enum: [
      VideoType.REVIEW,
      VideoType.TRAILER,
    ],
  })
  @IsEnum(VideoType)
  @IsNotEmpty()
  videoType: VideoType;


  @ApiProperty({
    description: 'Review channels',
    required: true,
    type: Boolean
  })
  @IsBooleanString()
  reviewChannels: boolean;
}