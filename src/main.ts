import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const validationPipeOptions = { whitelist: true };
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  await app.listen(process.env.NEST_PORT);
}
bootstrap();
