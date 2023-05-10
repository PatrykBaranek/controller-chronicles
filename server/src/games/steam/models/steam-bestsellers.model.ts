import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'steam_bestsellers' })
export class SteamBestSellers {
  @Prop([
    {
      img: String,
      name: String,
      link: String,
      price: String,
    },
  ])
  games: Array<{
    img: string;
    name: string;
    link: string;
    price: string;
  }>;

  @Prop()
  updateDate: Date;
}

export type SteamBestSellersDocument = SteamBestSellers & Document;
export const SteamBestSellersSchema =
  SchemaFactory.createForClass(SteamBestSellers);
