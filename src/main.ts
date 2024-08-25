import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const validationPipeOptions = {
    whitelist: true,
  };
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe(validationPipeOptions),
  );
  // change to config module
  const configService = app.get(ConfigService);
  await app.listen(
    configService.get('NEST_PORT'),
  );
}
bootstrap();
