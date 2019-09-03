import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from '../../common/owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel('Owner') private readonly ownerModel: Model<Owner>,
  ) {}

  async getDripsList(username: string) {
    return (await this.ownerModel.findOne({ owner: username }).exec()).drips;
  }

  private async findDripOwner(code: string) {
    return await this.ownerModel
      .findOne({
        'drips.id': code,
      })
      .exec();
  }

  // rimuove l'ownership della drip nel caso in cui questa sia di un altro utente
  async addDrip(username: string, code: string) {
    const owner = await this.findDripOwner(code);
    if (!owner) {
      await this.pushDrip(username, code);
    }
    throw new BadRequestException();
  }

  private async pushDrip(username: string, code: string) {
    return await this.ownerModel
      .updateOne(
        { owner: username },
        { $push: { drips: { id: code, shareable: false } } },
      )
      .exec();
  }

  async moveDrip(sub: string, code: string) {
    const owner = await this.findDripOwner(code);
    if (owner && owner.drips.find(s => s.id === code).shareable) {
      await this.removeDripObject(owner, code);
      await this.pushDrip(sub, code);
    }
  }

  async setState(sub: any, dripCode: string, state: boolean) {
    const owner = await this.ownerModel
      .findOne({
        // tslint:disable-next-line: object-literal-key-quotes
        owner: sub,
        'drips.id': dripCode,
      })
      .exec();

    if (owner) {
      owner.drips.find(s => s.id === dripCode).shareable = state;
      return await owner.save();
    }
    throw new BadRequestException();
  }

  async removeDrip(username: string, code: string) {
    const owner = await this.findDripOwner(code);
    if (owner && owner.owner === username) {
      return await this.removeDripObject(owner, code);
    }
    throw new BadRequestException();
  }

  private async removeDripObject(owner: Owner, code: string) {
    owner.drips.splice(owner.drips.findIndex(s => s.id === code), 1);
    return await owner.save();
  }
}
