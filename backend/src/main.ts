import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import * as express from 'express';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const server = express();
  const auth = new AuthenticationMiddleware().resolve();
  server.post('/drips', auth);

  const app = await NestFactory.create(AppModule, server);
  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(3000);
}
bootstrap();
