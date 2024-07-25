import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [process.env.FE_HOST],
    credentials: true,
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
