import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/models/mongo/mongodb.schema';
import { MysqlUser } from 'src/models/mysql/entities/user.entities';
import { PostgresUser } from 'src/models/postgres/entities/user.entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostgresUser], 'pgsql_db'),
    TypeOrmModule.forFeature([MysqlUser], 'mysql_db'),
    MongooseModule.forFeature([{ name: 'MongoUser', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
