import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {

  @ApiProperty({
    description: 'User email',
    type: String,
  })
  email: string;
}