import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { IgdbAuthService } from './igdb-auth.service';
import { IgdbToken, IgdbTokenSchema } from './models/igdb-token.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: IgdbToken.name, schema: IgdbTokenSchema }]),
  ],
  providers: [IgdbAuthService],
  exports: [IgdbAuthService],
})
export class IgdbAuthModule {}
