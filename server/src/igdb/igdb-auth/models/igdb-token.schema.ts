import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'igdb_tokens' })
export class IgdbToken {
  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  tokenType: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export type IgdbTokenDocument = IgdbToken & Document;
export const IgdbTokenSchema = SchemaFactory.createForClass(IgdbToken);
