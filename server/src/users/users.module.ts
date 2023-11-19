import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './services/users.service';
import { UsersRepository } from './database/users.repositry';
import { User, UserSchema } from './models/user.schema';
import { UsersController } from './controllers/users.controller';

import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CollectionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
