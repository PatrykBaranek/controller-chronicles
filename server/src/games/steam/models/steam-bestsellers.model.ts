import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SteamBestSellers {
  @Prop()
  img: string;

  @Prop()
  name: string;

  @Prop()
  steamLink: string;

  @Prop()
  price: string;
}

export type SteamBestSellersDocument = SteamBestSellers & Document;
export const SteamBestSellersSchema =
  SchemaFactory.createForClass(SteamBestSellers);
