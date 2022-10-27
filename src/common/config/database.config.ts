import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;

    if (connectionManager.has('default')) {
      options = connectionManager.get('default').options;
      await connectionManager.get('default').close();
    } else {
      console.log('get Options to connect database');

      options = {
        type: 'postgres',
        host: process.env.PG_DB_HOST,
        username: process.env.PG_DB_USER,
        password: process.env.PG_DB_PASSWD,
        database: process.env.PG_DB_NAME,
        port: 5432,
        logging: true,
        autoLoadEntities: true,
        synchronize: false,
      } as TypeOrmModuleOptions;
    }
    return options;
  }
}
