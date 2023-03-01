import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MysqlUser } from '../../models/mysql/entities/user.entities';
import { PostgresUser } from '../../models/postgres/entities/user.entities';
import { UserService } from './user.service';
describe('UserService', () => {
  let userService: UserService;
  let mysqlUserRepository: Repository<MysqlUser>;
  let postgresUserRepository: Repository<PostgresUser>;
  let mongoUserModel: any;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(MysqlUser, 'mysql_db');
  const POSTGRES_USER_REPOSITORY = getRepositoryToken(PostgresUser, 'pgsql_db');
  const MONGO_USER_MODEL = getModelToken('MongoUser');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    userService = module.get<UserService>(UserService);
    mysqlUserRepository = module.get<Repository<MysqlUser>>(
      USER_REPOSITORY_TOKEN,
    );
    postgresUserRepository = module.get<Repository<PostgresUser>>(
      POSTGRES_USER_REPOSITORY,
    );
    mongoUserModel = module.get(MONGO_USER_MODEL);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('userRepository should be defined', () => {
    expect(mysqlUserRepository).toBeDefined();
  });
  it('postgresUserRepository should be defined', () => {
    expect(postgresUserRepository).toBeDefined();
  });
  it('mongoUserModel should be defined', () => {
    expect(mongoUserModel).toBeDefined();
  });

  describe('createMysqlUser', () => {
    it('should encode password correctly', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('MysqlHashedPassword');

      await userService.createMysqlUser({
        name: 'MysqlMysqlLeo',
        email: 'MysqlMysqlLeo@gmail.com',
        password: '123456',
        role: 'admin',
        age: 28,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    });
    it('should call userRepository.save() with correct arguments', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('MysqlHashedPassword');

      await userService.createMysqlUser({
        name: 'MysqlLeo',
        email: 'MysqlLeo@gmail.com',
        age: 28,
        role: 'admin',
        password: '123456',
      });
      expect(mysqlUserRepository.save).toHaveBeenCalledWith({
        name: 'MysqlLeo',
        email: 'MysqlLeo@gmail.com',
        age: 28,
        role: 'admin',
        password: 'MysqlHashedPassword',
      });
    });
  });

  describe('createPostgresUser', () => {
    it('should encode password correctly', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('PgHashedPassword');

      await userService.createPostgresUser({
        name: 'PgLeo',
        email: 'PgLeo@gmail.com',
        password: '123456',
        role: 'admin',
        age: 28,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    });
    it('should call userRepository.save() with correct arguments', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('PgHashedPassword');

      await userService.createPostgresUser({
        name: 'PgLeo',
        email: 'PgLeo@gmail.com',
        password: '123456',
        role: 'admin',
        age: 28,
      });
      expect(postgresUserRepository.save).toHaveBeenCalledWith({
        name: 'PgLeo',
        email: 'PgLeo@gmail.com',
        password: 'PgHashedPassword',
        role: 'admin',
        age: 28,
      });
    });
  });

  describe('createMongoUser', () => {
    it('should encode password correctly', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('MongoHashedPassword');
      await userService.createMongoUser({
        name: 'MongoLeo',
        email: 'MongoLeo@gmail.com',
        password: '123456',
        role: 'admin',
        age: 28,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    });

    it('should call userRepository.save() with correct arguments', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('MongoHashedPassword');
      await userService.createMongoUser({
        name: 'MongoLeo',
        email: 'MongoLeo@gmail.com',
        password: '123456',
        role: 'admin',
        age: 28,
      });
      expect(mongoUserModel.create).toHaveBeenCalledWith({
        name: 'MongoLeo',
        email: 'MongoLeo@gmail.com',
        password: 'MongoHashedPassword',
        role: 'admin',
        age: 28,
      });
    });
  });
});
