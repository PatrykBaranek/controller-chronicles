import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCollectionDto {
  @ApiProperty({
    description: 'Collection ID',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  collectionId: string;
}
