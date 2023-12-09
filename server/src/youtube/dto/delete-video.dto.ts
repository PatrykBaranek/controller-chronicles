import { IsIn, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { VideoType } from "../util/youtube-utility.service";
import { ApiProperty } from "@nestjs/swagger";


export class DeleteVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  videoId: string;

  @ApiProperty({
    enum: VideoType,
  })
  @IsNotEmpty()
  @IsString()
  videoType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  gameId: number;
}