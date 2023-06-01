import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateNewCollectionDto {
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(5)
  priority: number;
}
