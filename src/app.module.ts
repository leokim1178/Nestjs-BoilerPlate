import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/user/user.module';
import { AppController } from './app.controller';
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
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
