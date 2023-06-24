import { ApiProperty } from '@nestjs/swagger';

export class HowLongToBeatResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  gameplayMain: number;

  @ApiProperty()
  gameplayMainExtra: number;

  @ApiProperty()
  gameplayCompletionist: number;
}
