import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, tap } from 'rxjs';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const isProduction = this.configService.get<boolean>('production');

    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const user = request.user;

    const userStatus = user ? 'Authenticated User' : 'Unauthenticated User';

    if (isProduction) {
      return next
        .handle();
    }

    this.logger.log(`Request: ${method} ${url} - ${userStatus}`);

    return next
      .handle()
      .pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const delay = Date.now() - now;
          this.logger.log(`Response: ${method} ${statusCode} ${url} ${delay}ms - ${userStatus}`);
        })
      );
  }
}