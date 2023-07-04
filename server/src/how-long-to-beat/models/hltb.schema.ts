import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class HowLongToBeat {
  @Prop()
  gameplayMain: number;

  @Prop()
  gameplayMainExtra: number;

  @Prop()
  gameplayCompletionist: number;
}
