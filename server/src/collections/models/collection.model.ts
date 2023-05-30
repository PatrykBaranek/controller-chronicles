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
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
