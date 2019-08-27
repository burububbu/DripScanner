import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

interface Owner extends Document {
  owner: string;
  drips: string[];
}

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel('Owner') private readonly ownerModel: Model<Owner>,
  ) {}

  async getDripsList(username: string) {
    return await this.ownerModel.findOne({ owner: username }).exec();
  }

  // rimuove l'ownership della drip nel caso in cui questa sia di un altro utente
  async addDrip(username: string, code: string) {
    const oldOwner: Owner[] = await this.ownerModel
      .aggregate([
        {
          $match: {
            drips: code,
          },
        },
      ])
      .exec();

    if (oldOwner.length !== 0) {
      this.removeDrip(oldOwner[0].owner, code);
    }
    return await this.ownerModel
      .updateOne({ owner: username }, { $addToSet: { drips: code } })
      .exec();
  }

  async removeDrip(username: string, code: string) {
    return await this.ownerModel
      .updateOne({ owner: username }, { $pullAll: { drips: [code] } })
      .exec();
  }
}
