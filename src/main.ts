import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerOptions } from './common/config/swagger.config';
import { HttpExceptionFilter } from './common/exception/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      exceptionFactory(errors) {
        const message = Object.values(errors[0].constraints);
        throw new BadRequestException(message[0]);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
