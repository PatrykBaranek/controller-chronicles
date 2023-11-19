import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: 'users' })
export class User {
  _id: string;

  @ApiProperty({
    description: 'User email',
    type: String,
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
  })
  @Prop({ required: true, unique: true })
  password: string;

  @ApiProperty({
    description: 'Refresh token',
    type: String,
  })
  @Prop()
  refresh_token: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
