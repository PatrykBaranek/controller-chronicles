import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { FeedNames } from '../composite/FeedParsers';


export class RssDto {
  @ApiProperty({ required: false })
  @IsEnum(FeedNames)
  blacklisted: FeedNames[];
}