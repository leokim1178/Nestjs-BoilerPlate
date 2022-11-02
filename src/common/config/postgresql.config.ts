import {
  TypeOrmDataSourceFactory,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { PostgresEntities } from 'src/models/postgres/mysql.index';
import { DataSource, DataSourceOptions } from 'typeorm';

export class PostgresqlConfig implements TypeOrmOptionsFactory {
  get postgresqlDataSource() {
    return this.createDataSource();
  }

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    let options: DataSourceOptions;
    options = {
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      username: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASSWD,
      database: process.env.PG_DB_NAME,
      port: 5432,
      logging: true,
      autoLoadEntities: true,
      entities: PostgresEntities,
      // synchronize: true,
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
