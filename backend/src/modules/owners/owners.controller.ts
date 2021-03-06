import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { User } from '../../common/decorators/user.decorator';
import { BooleanPipe } from '../../common/pipes/boolean.pipe';
import { NumberPipe } from '../../common/pipes/number.pipe';

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
    @Query('timeoutSeconds', new NumberPipe()) timeoutSeconds?: number,
  ) {
    await this.ownersService.setState(
      user.sub,
      dripCode,
      state,
      isNaN(timeoutSeconds) ? undefined : timeoutSeconds,
    );
  }

  @Delete('removeDrip/:dripCode')
  async removeDrip(@User() user, @Param('dripCode') dripCode: string) {
    await this.ownersService.removeDrip(user.sub, dripCode);
  }
}
