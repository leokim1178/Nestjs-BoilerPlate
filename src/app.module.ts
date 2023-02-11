import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { UserModule } from './apis/user/user.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { MongoDBConfig } from './common/config/mongodb.config';
import { MysqlConfig } from './common/config/mysql.config';
import { PgsqlConfig } from './common/config/pgsql.config';
import { HttpExceptionFilter } from './common/exception/httpException.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'dev' ? '.env.development' : '.env.production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        PG_DB_HOST: Joi.string().required(),
        PG_DB_USER: Joi.string().required(),
        PG_DB_PASSWD: Joi.string().required(),
        PG_DB_NAME: Joi.string().required(),
        MYSQL_DB_HOST: Joi.string().required(),
        MYSQL_DB_USER: Joi.string().required(),
        MYSQL_DB_PASSWD: Joi.string().required(),
        MYSQL_DB_ROOT_PASSWD: Joi.string().required(),
        MYSQL_DB_NAME: Joi.string().required(),
        MONGO_DB_HOST: Joi.string().required(),
        MONGO_DB_USER: Joi.string().required(),
        MONGO_DB_PASSWD: Joi.string().required(),
        MONGO_DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'pgsql_db',
      useClass: PgsqlConfig,
      dataSourceFactory: () => {
        return new PgsqlConfig().postgresqlDataSource;
      },
    }),
    TypeOrmModule.forRootAsync({
      name: 'mysql_db',
      useClass: MysqlConfig,
      dataSourceFactory: () => {
        return new MysqlConfig().mysqlDataSource;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MongoDBConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ req }),
      autoSchemaFile: '/src/common/graphql/schema/schema.gql',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
