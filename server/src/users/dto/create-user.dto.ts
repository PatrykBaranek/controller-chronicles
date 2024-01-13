import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    description: 'User email',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  refresh_token: string;
}
