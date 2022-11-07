import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('dd');
    return this.appService.getHello();
  }

  @Post('hi')
  stati(@Req() req: Request, @Res() res: Response) {
    console.log('ddd');
    res.sendFile(join(__dirname, '../public', 'sss.html'));
    return 'hi';
  }
}
