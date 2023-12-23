import { Injectable } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';
import { UsersRepository } from '../database/users.repositry';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = await this.usersRepository.create(createUserDto);

    return newUser;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<UserDocument> {
    return this.usersRepository.findById(id);
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<UserDocument> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<UserDocument> {
    return this.usersRepository.remove(id);
  }
}
