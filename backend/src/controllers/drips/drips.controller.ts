import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { DripsService } from '../../services/drips/drips.service';

@Controller('drips')
export class DripsController {
  constructor(private readonly dripsService: DripsService) {}

  @Get(':id')
  async getDrip(@Param() params) {
    const dripFound = await this.dripsService.findByID(params.id);
    if (dripFound) {
      return dripFound;
    }
    throw new NotFoundException();
  }
}
