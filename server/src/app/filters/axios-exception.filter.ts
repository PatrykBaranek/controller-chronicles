import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ExceptionBody } from './global-exception.filter';
import { Request, Response } from 'express';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status = exception.response?.status || 500;

    const responseBody: ExceptionBody = {
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(responseBody);
  }
}
