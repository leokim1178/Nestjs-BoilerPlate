import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInput, CreateUserOutput } from './dto/createUser.dto';

import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create User',
    description: 'This is Sample API Creating User',
  })
  @ApiBody({
    type: CreateUserInput,
    required: true,
    description: 'Create User Input data',
  })
  @ApiResponse({
    status: 200,
    description: 'User Created',
    type: CreateUserOutput,
  })
  async createUser(
    @Body()
    createUserInput: CreateUserInput,
  ) {
    try {
      await this.userService.createPostgresUser(createUserInput);
      await this.userService.createMysqlUser(createUserInput);
      await this.userService.createMongoUser(createUserInput);
      return {
        status: 200,
        message: 'User Created',
      };
    } catch (e) {
      throw new BadRequestException('Bad Dto');
    }
  }
}
