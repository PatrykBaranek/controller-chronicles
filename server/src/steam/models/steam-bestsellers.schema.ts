import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'steam_bestsellers', timestamps: true })
export class SteamBestSellers {
  @Prop([
    {
      img: String,
      name: String,
      link: String,
    },
  ])
  games: Array<{
    img: string;
    name: string;
    link: string;
  }>;
}

export type SteamBestSellersDocument = SteamBestSellers & Document;
export const SteamBestSellersSchema =
  SchemaFactory.createForClass(SteamBestSellers);
