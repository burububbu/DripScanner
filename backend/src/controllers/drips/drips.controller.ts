import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Put,
  Body,
} from '@nestjs/common';
import { DripsService } from '../../services/drips/drips.service';
import { UpdateDripOwnerDto } from 'src/common/update-drip.owner.dto';

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

  @Put(':id')
  async setOwner(
    @Param('id') id,
    @Body() updateDripOwnerDto: UpdateDripOwnerDto,
  ) {
    await this.dripsService.updateOwner(id, updateDripOwnerDto.name);
  }
}
