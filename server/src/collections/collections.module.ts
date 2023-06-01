import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';
import { CollectionsRepository } from './collections.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'mongoose';
import { CollectionSchema } from './models/collection.model';

@Module({
  imports: [
    RawgGamesModule,
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  providers: [CollectionsService, CollectionsRepository],
  controllers: [CollectionsController],
  exports: [CollectionsService],
})
export class CollectionsModule {}
