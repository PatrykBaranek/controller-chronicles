import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { GameUpdate, GameUpdateDocument } from "../models/game-update.schema";


@Injectable()
export class GamesUpdateRepository {

  constructor(@InjectModel(GameUpdate.name) private gameTrashModel: Model<GameUpdateDocument>) {}

  async addGameToTrash(game: GameUpdate) {
    const gameInDb = await this.gameTrashModel.findOne({ _id: game._id });

    if (gameInDb == null) {
      const gameToTrash = new this.gameTrashModel(game);
      return gameToTrash.save();
    }

    const updateQuery: any = { ...game };
    const errorFields = ['youtubeErrorMessages', 'steamErrorMessages', 'hltbErrorMessages', 'reviewsSitesErrorMessages'];

    errorFields.forEach(field => {

      if (updateQuery[field]) {
        updateQuery.$push = { [field]: { $each: updateQuery[field] } };
        delete updateQuery[field];
      }

    });

    return gameInDb.updateOne({ _id: game._id }, updateQuery);
  }

  async findGame(gameId: number) {
    return this.gameTrashModel.findOne({ _id: gameId });
  }

}