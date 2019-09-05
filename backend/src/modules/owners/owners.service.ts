import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from '../../common/dtos/owner.dto';
import { DripsService } from '../drips/drips.service';

@Injectable()
export class OwnersService {
  constructor(
    private readonly dripService: DripsService,
    @InjectModel('Owner') private readonly ownerModel: Model<Owner>,
  ) {}

  async getDripsList(username: string) {
    try {
      return (await this.ownerModel.findOne({ owner: username }).exec()).drips;
    } catch (err) {
      if (err.status === 404) {
        throw new NotFoundException('Drips not found');
      }
      throw new InternalServerErrorException(
        'Internal server error',
        JSON.stringify(err),
      );
    }
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
    if (owner) {
      throw new ForbiddenException('Drip is already assigned.');
    }
    await this.pushDrip(username, code);
  }

  private async pushDrip(username: string, code: string) {
    // check drip existence
    if (!(await this.dripService.exists(code))) {
      throw new NotFoundException(`Drip ${code} doesn't exist`);
    }
    try {
      return await this.ownerModel
        .updateOne(
          { owner: username },
          { $push: { drips: { id: code, shareable: false } } },
        )
        .exec();
    } catch (err) {
      if (err.status === 404) {
        throw new NotFoundException(`Username "${username}" not found.`);
      }
      throw new InternalServerErrorException(
        'Unexpected error',
        JSON.stringify(err),
      );
    }
  }

  async moveDrip(sub: string, code: string) {
    const owner = await this.findDripOwner(code);
    if (!owner) {
      throw new NotFoundException('The drip doesn\'t have any owner');
    }
    const drip = owner.drips.find(s => s.id === code);
    if (drip.shareable === false) {
      throw new ForbiddenException('The drip is not shareable');
    }
    if (drip.expireDate && drip.expireDate <= new Date()) {
      await this.setState(owner.owner, drip.id, false);
      throw new ForbiddenException('The drip is not shareable anymore');
    }

    await this.removeDripObject(owner, code);
    await this.pushDrip(sub, code);
  }

  async setState(
    sub: string,
    dripCode: string,
    state: boolean,
    timeoutSeconds?: number,
  ) {
    const owner = await this.ownerModel
      .findOne({
        // tslint:disable-next-line: object-literal-key-quotes
        owner: sub,
        'drips.id': dripCode,
      })
      .exec();

    if (!owner) {
      throw new NotFoundException('Drip doesn\'t have any owner');
    }
    const drip = owner.drips.find(s => s.id === dripCode);
    drip.shareable = state;
    drip.expireDate = timeoutSeconds
      ? new Date(Date.now() + timeoutSeconds * 1_000)
      : undefined;

    return await owner.save();
  }

  async removeDrip(username: string, code: string) {
    const owner = await this.findDripOwner(code);
    if (!owner) {
      throw new NotFoundException('The drip doesn\'t have any owner');
    }
    if (owner.owner === username) {
      return await this.removeDripObject(owner, code);
    }
    throw new ForbiddenException('You cannot remove the another user\'s drip');
  }

  private async removeDripObject(owner: Owner, code: string) {
    owner.drips.splice(owner.drips.findIndex(s => s.id === code), 1);
    return await owner.save();
  }
}
