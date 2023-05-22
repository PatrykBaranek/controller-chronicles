import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './models/user.schema';
import { UsersRepository } from './users.repositry';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return this.usersRepository.create(createUserDto.email, hashedPassword);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }
}
