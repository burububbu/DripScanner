import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { DripsModule } from './modules/drips/drips.module';
import { OwnersModule } from './modules/owners/owners.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE, { useNewUrlParser: true }),
    DripsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
