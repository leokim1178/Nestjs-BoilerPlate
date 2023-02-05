import {
  TypeOrmDataSourceFactory,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { postgresEntities } from 'src/models/postgres/postgres.index';

import { DataSource, DataSourceOptions } from 'typeorm';

export class PgsqlConfig implements TypeOrmOptionsFactory {
  get postgresqlDataSource() {
    return this.createDataSource();
  }

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    let options: DataSourceOptions;
    options = {
      name: 'pgsql_db',
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      username: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASSWD,
      database: process.env.PG_DB_NAME,
      port: 5432,
      logging: true,
      autoLoadEntities: true,
      entities: postgresEntities,
      synchronize: true,
    } as DataSourceOptions;

    const dataSource = new DataSource(options);

    if (dataSource.isInitialized) {
      options = dataSource.options;
      await dataSource.destroy();
    }

    return options;
  }

  options = this.createTypeOrmOptions();

  createDataSource: TypeOrmDataSourceFactory =
    async (): Promise<DataSource> => {
      const options = await this.options;
      const dataSource = new DataSource(options);
      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }
      return dataSource;
    };
}
