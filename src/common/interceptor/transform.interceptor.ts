import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  message: string;
  total?: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.getArgByIndex(1).statusCode;
        let response;

        if (statusCode === 200 || statusCode === 201) {
          if (data instanceof Array) {
            if (data.length === 0) {
              response = {
                message: 'success but no data found',
                data,
              };
            } else
              response = {
                message: 'success',
                total: data.length,
                data,
              };
          } else {
            if (!data) {
              response = {
                message: 'success but no data found',
                data,
              };
            } else
              response = {
                message: 'success',
                data,
              };
          }
        }

        return response;
      }),
    );
  }
}
