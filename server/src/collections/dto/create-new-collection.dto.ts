import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateNewCollectionDto {
  @ApiProperty({
    description: 'Collection name',
    type: String,
  })
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Collection priority',
    type: Number,
  })
  @IsInt()
  @Min(0)
  @Max(5)
  priority: number;
}
