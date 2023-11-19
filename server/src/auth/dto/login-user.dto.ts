import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/models/user.schema';


export class LoginUserDto extends User {
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