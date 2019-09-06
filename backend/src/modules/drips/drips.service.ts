import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Drip } from '../../common/interfaces/drip.interface';
import { Model } from 'mongoose';

@Injectable()
export class DripsService {
  constructor(@InjectModel('Drip') private readonly dripModel: Model<Drip>) {}

  async findByID(id: string) {
    return await this.dripModel.findOne({ codice: id }).exec();
  }

  async exists(id: string) {
    return (await this.dripModel.countDocuments({ codice: id }).exec()) > 0;
  }
}
