import { IsString } from 'class-validator';
import { IsSameAs } from './decorators/is-same-as.decorator';

export class ResetPasswordDto {

  @IsString()
  password: string;

  @IsString()
  @IsSameAs('password', { message: 'Passwords do not match' })
  repeat_password: string;
}