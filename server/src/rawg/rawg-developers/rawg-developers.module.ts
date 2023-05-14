import { Module } from '@nestjs/common';
import { RawgDevelopersController } from './rawg-developers.controller';
import { RawgDevelopersService } from './rawg-developers.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RawgDevelopersController],
  providers: [RawgDevelopersService],
})
export class RawgDevelopersModule {}
