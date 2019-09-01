import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DripSchema } from './common/drip.schema';
import { DripsController } from './controllers/drips/drips.controller';
import { DripsService } from './services/drips/drips.service';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { OwnerSchema } from './common/owner.schema';
import { OwnersController } from './controllers/owners/owners.controller';
import { OwnersService } from './services/owners/owners.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://AlessandraB:qwqw97b@dripscanner-frbeq.mongodb.net/dripScanner',
      { useNewUrlParser: true },
    ),
    MongooseModule.forFeature([
      { name: 'Drip', schema: DripSchema },
      { name: 'Owner', schema: OwnerSchema },
    ]),
  ],
  controllers: [AppController, DripsController, OwnersController],
  providers: [AppService, DripsService, OwnersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
