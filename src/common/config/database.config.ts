import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    let options: DataSourceOptions;
    options = {
      name: 'postgresql dataSource',
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      username: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASSWD,
      database: process.env.PG_DB_NAME,
      port: 5432,
      logging: true,
      autoLoadEntities: true,
      synchronize: false,
    } as DataSourceOptions;

    const dataSource = new DataSource(options);

    if (dataSource.isInitialized) {
      options = dataSource.options;
      await dataSource.destroy();
    }

    return options;
  }
}
