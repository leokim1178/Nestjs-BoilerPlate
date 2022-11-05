import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser() {
    const pguser = await this.userService.createPostgresUser();
    const mysqluser = await this.userService.createMysqlUser();
    const mongouser = await this.userService.createMongoUser();
    return { pguser, mysqluser, mongouser };
  }
}
