import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.join(
    __dirname,
    '..',
    `${process.env.NODE_ENV || 'development'}.env`,
  ),
});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.use(
    rateLimit({
      windowsMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowsMs
    }),
  );
  await app.listen(PORT);
}
bootstrap();
