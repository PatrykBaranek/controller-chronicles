import { Module } from '@nestjs/common';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './controllers/collections.controller';
import { CollectionsRepository } from './database/collections.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'mongoose';
import { CollectionSchema } from './models/collection.model';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    GamesModule,
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  providers: [CollectionsService, CollectionsRepository],
  controllers: [CollectionsController],
  exports: [CollectionsService],
})
export class CollectionsModule {}
