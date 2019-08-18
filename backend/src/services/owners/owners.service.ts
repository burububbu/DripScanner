import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from './Owner.interface';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel('Owner') private readonly ownerModel: Model<Owner>,
  ) {}

  async getDripsList(username: string) {
    return await this.ownerModel.findOne({ owner: username }).exec();
  }

  async addDrip(username: string, code: string) {
    return await this.ownerModel
      .updateOne({ owner: username }, { $push: { drips: code } })
      .exec();
  }

  async removeDrip(username: string, code: string) {
    return await this.ownerModel
      .updateOne({ owner: username }, { $pullAll: { drips: [code] } })
      .exec();
  }
}
