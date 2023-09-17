import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ collection: 'games_update' })
export class GameUpdate {
    @Prop()
    _id: number;

    @Prop()
    name: string;

    @Prop({ default: 0 })
    updateTimesWithError?: number;

    @Prop()
    hltbErrorMessages?: string[];

    @Prop()
    steamErrorMesseges?: string[];

    @Prop()
    youtubeErrorMessages?: string[];

    @Prop()
    reviewsSitesErrorMessages?: string[];

    @Prop({ default: true })
    update_reviews?: boolean;
  
    @Prop({ default: true })
    update_hltb?: boolean;
  
    @Prop({ default: true })
    update_steam?: boolean;
  
    @Prop({ default: true })
    update_youtube?: boolean;
}


export type GameUpdateDocument = GameUpdate & Document;
export const GameUpdateSchema = SchemaFactory.createForClass(GameUpdate);

GameUpdateSchema.pre('updateOne', function(next) {
    this.updateOne({}, { $inc: { updateTimesWithError: 1 } });
    next();
});