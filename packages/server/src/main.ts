import { NestFactory, HTTP_SERVER_REF } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DBExceptionsFilter } from './DBExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new DBExceptionsFilter(httpRef));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
