import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('NestJS Boilerplate')
  .setDescription('NestJS Boilerplate API description')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    description:
      'JWT Authorization header using the Bearer scheme. Example: "bearer {token}',
  })
  .build();
