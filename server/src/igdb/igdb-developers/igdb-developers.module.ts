import { Module } from '@nestjs/common';
import { IgdbDevelopersController } from './igdb-developers.controller';
import { IgdbDevelopersService } from './igdb-developers.service';
import { IgdbApiModule } from '../igdb-api/igdb-api.module';

@Module({
  imports: [IgdbApiModule],
  controllers: [IgdbDevelopersController],
  providers: [IgdbDevelopersService],
})
export class IgdbDevelopersModule {}
