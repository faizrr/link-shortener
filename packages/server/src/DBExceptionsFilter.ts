import {
  Catch,
  ArgumentsHost,
  HttpServer,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class DBExceptionsFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const newException = new NotFoundException(exception.message);
    super.catch(newException, host);
  }
}
