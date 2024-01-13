import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/games/models/game.schema';

export type CollectionDocument = Collection & Document;

@Schema({ collection: 'collections' })
export class Collection {
  @ApiProperty({
    description: 'The id of the user who owns the collection',
    type: String,
  })
  @Prop()
  userId: string;

  @ApiProperty({
    description: 'The name of the collection',
    type: String,
  })
  @Prop({ required: false, default: 'My Collection' })
  name: string;

  @ApiProperty({
    description: 'The games in the collection',
    type: [Game],
  })
  @Prop([Game])
  games: Game[];

  @ApiProperty({
    description: 'The priority of the collection',
    minimum: 0,
    maximum: 5,
    default: 0,
    type: Number,
  })
  @Prop({ min: 0, max: 5, default: 0 })
  priority: number;

  @ApiProperty({
    description: 'The date the collection was created',
    type: Date,
  })
  @Prop({ default: new Date() })
  createdAt: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
