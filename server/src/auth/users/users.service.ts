import { Injectable } from '@nestjs/common';
import { User } from './models/user.schema';
import { UsersRepository } from './users.repositry';
import { CreateUserDto } from './dto/create-user.dto';
import { CollectionsService } from 'src/collections/services/collections.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly collectionsService: CollectionsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(createUserDto.email, createUserDto.password);

    await this.collectionsService.createDefaultCollections(newUser.id);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }
}
