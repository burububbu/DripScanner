import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Put,
  Body,
} from '@nestjs/common';
import { DripsService } from '../../services/drips/drips.service';

@Controller('drips')
export class DripsController {
  constructor(private readonly dripsService: DripsService) {}

  @Get(':id')
  async getDrip(@Param() params) {
    const dripFound = await this.dripsService.findByID(params.id);
    if (dripFound == null) {
      throw new NotFoundException();
    } else {
      return dripFound;
    }
  }
}
