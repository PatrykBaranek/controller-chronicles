import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from '../models/user.schema';

export class CreateUserDto extends User {
  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  declare password: string;

  declare refresh_token: string;
}
