import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ autoCreate: false, timestamps: true })
export class YoutubeVideo {
  @Prop({ required: true })
  game_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  link: string;
}

export type YoutubeVideoDocument = YoutubeVideo & Document;
export const YoutubeVideoSchema = SchemaFactory.createForClass(YoutubeVideo);