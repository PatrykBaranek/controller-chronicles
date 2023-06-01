import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Game } from 'src/rawg/rawg-games/models/game.schema';

export type CollectionDocument = Collection & Document;

@Schema({ collection: 'collections' })
export class Collection {
  @Prop()
  userId: string;

  @Prop({ required: false, default: 'My Collection' })
  name: string;

  @Prop([Game])
  games: Game[];

  @Prop({ min: 0, max: 5, default: 0 })
  priority: number;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
