import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const log = {
      name: exception.name,
      statusCode: (exception as HttpException).getStatus(),
      timestamp: new Date(),
      url: req.url,
      message: exception.message,
    };

    console.log(log);

    res
      .status((exception as HttpException).getStatus())
      .json({ response, timeStamp: log.timestamp });
  }
}
