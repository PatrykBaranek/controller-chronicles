import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from '../models/user.schema';

export class CreateUserDto extends User {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  refresh_token: string;
}
