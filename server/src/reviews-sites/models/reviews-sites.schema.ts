import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ autoCreate: false, timestamps: true })
export class ReviewsSites {

  @ApiProperty({
    description: 'Source of the review',
    type: String,
  })
  @Prop({ required: true })
  source: string;

  @ApiProperty({
    description: 'Title of the review',
    type: String,
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'URL to the review',
    type: String,
  })
  @Prop({ required: true, match: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/ })
  url: string;
}

export type ReviewsSitesDocument = ReviewsSites & Document;
export const ReviewsSitesSchema = SchemaFactory.createForClass(ReviewsSites);