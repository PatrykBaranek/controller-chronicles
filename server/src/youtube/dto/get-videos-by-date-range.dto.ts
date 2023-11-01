import { IsEnum, IsNotEmpty, IsBooleanString } from 'class-validator';
import { VideoType } from '../util/youtube-utility.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateStringValid } from './decorators/IsDateStringValidConstraint.decorator';

export class GetVideosByDateRangeDto {
  @ApiProperty({
    description: 'From date',
    format: 'YYYY-MM-DD',
    required: true,
    type: String
  })
  @IsDateStringValid({
    message: 'fromDate must be in YYYY-MM-DD format and valid'
  })
  @IsNotEmpty()
  fromDate: string;

  @ApiProperty({
    description: 'To date',
    format: 'YYYY-MM-DD',
    required: true,
    type: String
  })
  @IsDateStringValid({
    message: 'toDate must be in YYYY-MM-DD format'
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