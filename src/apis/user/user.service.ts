import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlUser } from 'src/models/mysql/entities/user.entities';
import { PostgresUser } from 'src/models/postgres/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PostgresUser, 'postgresql_db')
    private readonly postgresUserRepository: Repository<PostgresUser>,
    @InjectRepository(MysqlUser, 'mysql_db')
    private readonly mysqlUserRepository: Repository<MysqlUser>,
    @InjectModel('MongoUser')
    private readonly mongoUserModel,
  ) {}

  async createPostgresUser() {
    const user = await this.postgresUserRepository.save({
      name: 'postgres',
      email: 'leo@postgres.com',
      age: 18,
      role: 'postgres',
      password: 'postgres',
    });
    return user;
  }

  async createMysqlUser() {
    const user = await this.mysqlUserRepository.save({
      name: 'mysql',
      email: 'leo@mysql.com',
      age: 18,
      role: 'mysql',
      password: 'mysql',
    });
    return user;
  }

  async createMongoUser() {
    const user = await this.mongoUserModel.create({
      name: 'mongo',
      email: 'leo@mongo.com',
      password: 'mongo',
    });
    return user;
  }
}
