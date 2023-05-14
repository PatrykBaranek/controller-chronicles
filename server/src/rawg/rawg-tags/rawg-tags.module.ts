import { Module } from '@nestjs/common';
import { RawgTagsService } from './rawg-tags.service';
import { RawgTagsController } from './rawg-tags.controller';
import { RawgApiModule } from '../rawg-api/rawg-api.module';

@Module({
  imports: [RawgApiModule],
  providers: [RawgTagsService],
  controllers: [RawgTagsController],
})
export class RawgTagsModule {}
