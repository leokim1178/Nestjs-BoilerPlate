import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MysqlUser } from '../../models/mysql/entities/user.entities';
import { PostgresUser } from '../../models/postgres/entities/user.entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', () => {
  let controller: UserController;
  let userService: UserService;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(MysqlUser, 'mysql_db');
  const POSTGRES_USER_REPOSITORY = getRepositoryToken(PostgresUser, 'pgsql_db');
  const MONGO_USER_MODEL = getModelToken('MongoUser');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createPostgresUser: jest.fn(),
            createMysqlUser: jest.fn(),
            createMongoUser: jest.fn(),
          },
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: POSTGRES_USER_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: MONGO_USER_MODEL,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should throw error if name is not provided', async () => {
      jest
        .spyOn(userService, 'createPostgresUser')
        .mockImplementationOnce(() => {
          throw new BadRequestException('Bad Dto');
        });
      try {
        const response = await controller.createUser({
          name: undefined,
          email: 'leo@gmail.com',
          age: 28,
          role: 'admin',
          password: '123456',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toEqual('Bad Dto');
      }
    });
    it('should throw error if email is not provided', async () => {
      jest
        .spyOn(userService, 'createPostgresUser')
        .mockImplementationOnce(() => {
          throw new BadRequestException('Bad Dto');
        });
      try {
        const response = await controller.createUser({
          name: 'leo',
          email: undefined,
          age: 28,
          role: 'admin',
          password: '123456',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toEqual('Bad Dto');
      }
    });

    it('should return success', async () => {
      const response = await controller.createUser({
        name: 'leo',
        email: 'leo@gmail.com',
        age: 28,
        role: 'admin',
        password: '123456',
      });
      expect(response).toEqual({
        status: 200,
        message: 'User Created',
      });
    });
  });
});
