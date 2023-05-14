import { Module } from '@nestjs/common';
import { HowLongToBeatService } from './how-long-to-beat.service';

@Module({
  providers: [HowLongToBeatService],
  exports: [HowLongToBeatService],
})
export class HowLongToBeatModule {}
