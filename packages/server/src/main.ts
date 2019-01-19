import { NestFactory, HTTP_SERVER_REF } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBExceptionsFilter } from './DBExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new DBExceptionsFilter(httpRef));
  await app.listen(3000);
}
bootstrap();
