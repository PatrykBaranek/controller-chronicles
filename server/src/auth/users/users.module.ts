import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repositry';
import { HashService } from './hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository, HashService],
  exports: [UsersService, UsersRepository, HashService],
})
export class UsersModule {}
