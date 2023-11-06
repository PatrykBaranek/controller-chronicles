import { IsEnum, IsNotEmpty, IsBooleanString, IsNumberString, Min, IsString, IsNumber } from 'class-validator';
import { VideoType } from '../util/youtube-utility.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateStringValid } from './decorators/IsDateStringValidConstraint.decorator';
import { Transform } from 'class-transformer';

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
    description: 'Number of games',
    required: true,
    default: 5,
    type: Number
  })
  @Min(5)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  gamesCount: number;

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
}