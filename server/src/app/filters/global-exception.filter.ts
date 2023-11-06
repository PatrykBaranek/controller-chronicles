import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

interface ExceptionResponse {
  response: string | object;
  message: string;
  error: string;
}
export interface ExceptionBody {
  statusCode: number;
  path: string;
  message: string | null;
  error?: string | null;
  timestamp: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ExceptionBody = {
      statusCode: status,
      error: exceptionResponse.error || null,
      message: exceptionResponse.message || null,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response
      .status(status)
      .json(responseBody);
  }
}