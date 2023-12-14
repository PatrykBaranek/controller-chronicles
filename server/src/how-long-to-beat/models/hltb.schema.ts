import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class HowLongToBeat {
  @ApiProperty({
    description: 'Gameplay duration for main storyline',
    type: Number,
  })
  @Prop({ required: true, min: 0 })
  gameplayMain: number;

  @ApiProperty({
    description: 'Gameplay duration for main storyline with extra content',
    type: Number,
  })
  @Prop({ required: true, min: 0 })
  gameplayMainExtra: number;

  @ApiProperty({
    description: 'Gameplay duration for completionist',
    type: Number,
  })
  @Prop({ required: true, min: 0 })
  gameplayCompletionist: number;

  @Prop({ required: false, default: false })
  notFoundOnHltb?: boolean;

  updatedAt: Date;
  createdAt: Date;
}