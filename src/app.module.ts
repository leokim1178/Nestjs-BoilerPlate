import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlConfig } from './common/config/mysql.config';
import { PgsqlConfig } from './common/config/pgsql.config';
import { MongoDBConfig } from './common/config/mongodb.config';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
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
  providers: [AppService],
})
export class AppModule {}
