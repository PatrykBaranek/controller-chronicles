import { Module } from '@nestjs/common';
import { RawgTagsService } from './rawg-tags.service';
import { RawgTagsController } from './rawg-tags.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RawgTagsService],
  controllers: [RawgTagsController],
})
export class RawgTagsModule {}
