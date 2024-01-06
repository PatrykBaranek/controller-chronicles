import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class LoginUserDto {
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
  @IsString()
  @IsNotEmpty()
  password: string;
}