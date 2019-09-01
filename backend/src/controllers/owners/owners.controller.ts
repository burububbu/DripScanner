import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { OwnersService } from '../../services/owners/owners.service';
import { DripOwnerDto } from '../../common/drip-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}
  // ottiene lista drips associate ad un utente
  @Get(':username')
  async getDrips(@Param('username') username) {
    const owner = await this.ownersService.getDripsList(username);
    const drips = owner.drips;
    return drips;
  }

  @Put('addDrip/:username')
  async addDrip(
    @Param('username') username,
    @Body() dripOwnerDto: DripOwnerDto,
  ) {
    await this.ownersService.addDrip(username, dripOwnerDto.code);
  }

  @Put('removeDrip/:username')
  async removeDrip(
    @Param('username') username,
    @Body() dripOwnerDto: DripOwnerDto,
  ) {
    await this.ownersService.removeDrip(username, dripOwnerDto.code);
  }
}
