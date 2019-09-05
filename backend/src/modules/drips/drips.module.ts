import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DripSchema } from '../../common/schemas/drip.schema';
import { DripsController } from './drips.controller';
import { DripsService } from './drips.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Drip', schema: DripSchema }])],
  controllers: [DripsController],
  providers: [DripsService],
  exports: [DripsService],
})
export class DripsModule {}
