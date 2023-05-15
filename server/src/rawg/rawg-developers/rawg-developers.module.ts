import { Module } from '@nestjs/common';
import { RawgDevelopersController } from './rawg-developers.controller';
import { RawgDevelopersService } from './rawg-developers.service';
import { RawgApiModule } from '../rawg-api/rawg-api.module';

@Module({
  imports: [RawgApiModule],
  controllers: [RawgDevelopersController],
  providers: [RawgDevelopersService],
})
export class RawgDevelopersModule {}
