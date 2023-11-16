import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.schema';
import { Model } from 'mongoose';
import { HashService } from '../services/hash.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly hashService: HashService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashService.hashPassword(password);

    return this.userModel.create({
      email,
      password: hashedPassword,
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email });
  }
}
