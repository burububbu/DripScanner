import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Drip } from './drip.interface';
import { Model } from 'mongoose';

@Injectable()
export class DripsService {
  constructor(@InjectModel('Drip') private readonly dripModel: Model<Drip>) {}

  async findByID(id: string) {
    return await this.dripModel.findOne({ codice: id }).exec();
  }

  async updateOwner(id: string, name: string) {
    return await this.dripModel
      .updateOne({ codice: id }, { $set: { owner: name } })
      .exec();
  }
}
