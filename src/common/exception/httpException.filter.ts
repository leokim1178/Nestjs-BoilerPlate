import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      this.logger.error(exception);
      exception = new InternalServerErrorException();
    }
    const response = (exception as HttpException).getResponse();

    const errorLog = {
      name: exception.name,
      statusCode: (exception as HttpException).getStatus(),
      timestamp: new Date(),
      url: req.url,
      message: exception.message,
    };
    this.logger.error(errorLog);

    res
      .status((exception as HttpException).getStatus())
      .send({ response, timeStamp: errorLog.timestamp });
  }
}
