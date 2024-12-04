import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { showError } from './error-message';
import { GRL } from './consts/errors/grl';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (
      exception.statusCode != null &&
      exception.statusCode != HttpStatus.UNAUTHORIZED
    ) {
      console.error(exception);
    } else if (exception.statusCode == null) {
      console.error(exception);
    }

    if (exception.isOperational !== undefined) {
      if (exception.err !== undefined) {
        response
          .status(exception.err.response.status)
          .send(exception.err.response.data);
      }
      const status = exception.statusCode;
      const exceptionResponse = showError(
        status,
        exception,
        exception.internalErrorCode,
      );
      response.status(status).send({
        status: exceptionResponse.status,
        description: exceptionResponse.description,
      });
    } else {
      console.error(
        `request path that error caused: ${request.path}\n` +
          `isOperational: false`,
      );
      const status = exception.status ?? HttpStatus?.INTERNAL_SERVER_ERROR;
      response.status(status).send({
        status: 1,
        description: {
          fa: GRL.fa.INTERNAL,
          en: GRL.en.INTERNAL,
        },
      });
    }
  }
}
