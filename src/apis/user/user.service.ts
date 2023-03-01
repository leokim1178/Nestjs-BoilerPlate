import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MysqlUser } from 'src/models/mysql/entities/user.entities';
import { PostgresUser } from 'src/models/postgres/entities/user.entities';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PostgresUser, 'pgsql_db')
    private readonly postgresUserRepository: Repository<PostgresUser>,
    @InjectRepository(MysqlUser, 'mysql_db')
    private readonly mysqlUserRepository: Repository<MysqlUser>,
    @InjectModel('MongoUser')
    private readonly mongoUserModel,
  ) {}

  async createPostgresUser(createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    const user = await this.postgresUserRepository.save(createUserInput);
    return user;
  }

  async createMysqlUser(createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    const user = await this.mysqlUserRepository.save(createUserInput);
    return user;
  }

  async createMongoUser(createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    const user = await this.mongoUserModel.create(createUserInput);
    return user;
  }
}
