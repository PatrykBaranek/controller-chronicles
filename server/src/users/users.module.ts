import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { UsersRepository } from './database/users.repositry';
import { HashService } from './services/hash.service';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CollectionsModule,
  ],
  providers: [UsersService, UsersRepository, HashService],
  exports: [UsersService, UsersRepository, HashService],
})
export class UsersModule {}
