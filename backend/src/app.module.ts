import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DripsController } from './controllers/drips/drips.controller';
import { DripsService } from './services/drips/drips.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DripSchema } from './common/drip.schema';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://AlessandraB:qwqw97b@dripscanner-frbeq.mongodb.net/dripScanner',
      { useNewUrlParser: true },
    ),
    MongooseModule.forFeature([{ name: 'Drip', schema: DripSchema }]),
    AuthModule,
  ],
  controllers: [AppController, DripsController],
  providers: [AppService, DripsService],
})
export class AppModule {}
