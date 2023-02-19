import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('healthCheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'healthcheck',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  @ApiOperation({
    summary: 'error',
  })
  getError(): string {
    throw new NotFoundException('error');
  }
}
