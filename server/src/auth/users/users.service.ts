import { Injectable } from '@nestjs/common';
import { User } from './models/user.schema';
import { UsersRepository } from './users.repositry';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(
      createUserDto.email,
      createUserDto.password,
    );
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }
}
