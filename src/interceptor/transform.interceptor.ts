import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Observable, map } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name, {});

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest();
    const { url, method } = request;

    const response = ctx.getResponse();
    const { statusCode } = response;

    this.logger.log(
      `Http Status: ${statusCode}, Method: ${method}, URL: ${url} `,
    );

    return next.handle().pipe(
      map((data) => {
        const resp = {
          statusCode: HttpStatus.OK,
          timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };

        if (typeof data === 'string') {
          return {
            ...resp,
            message: data,
          };
        } else if (Array.isArray(data) || typeof data === 'object') {
          return {
            ...resp,
            data,
          };
        } else {
          return { ...resp, ...data };
        }
      }),
    );
  }
}
