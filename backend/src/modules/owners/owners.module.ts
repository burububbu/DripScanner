import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DripSchema } from '../../common/schemas/drip.schema';
import { OwnerSchema } from '../../common/schemas/owner.schema';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { DripsModule } from '../drips/drips.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Drip', schema: DripSchema },
      { name: 'Owner', schema: OwnerSchema },
    ]),
    DripsModule,
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
