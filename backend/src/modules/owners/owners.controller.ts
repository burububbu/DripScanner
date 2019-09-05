import { Controller, Get, Param, Put } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { User } from '../../common/decorators/user.decorator';
import { BooleanPipe } from '../../common/pipes/boolean.pipe';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get()
  async getDrips(@User() user) {
    return await this.ownersService.getDripsList(user.sub);
  }

  @Put('addDrip/:dripCode')
  async addDrip(@User() user, @Param('dripCode') dripCode: string) {
    await this.ownersService.addDrip(user.sub, dripCode);
  }

  @Put('moveDrip/:dripCode')
  async moveDrip(@User() user, @Param('dripCode') dripCode: string) {
    await this.ownersService.moveDrip(user.sub, dripCode);
  }

  @Put('setShareable/:dripCode/:state')
  async setShareable(
    @User() user,
    @Param('dripCode') dripCode: string,
    @Param('state', new BooleanPipe()) state: boolean,
  ) {
    await this.ownersService.setState(user.sub, dripCode, state);
  }

  @Put('removeDrip/:dripCode')
  async removeDrip(@User() user, @Param('dripCode') dripCode: string) {
    await this.ownersService.removeDrip(user.sub, dripCode);
  }
}
