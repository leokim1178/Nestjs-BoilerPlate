import {
  TypeOrmDataSourceFactory,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { mysqlEntities } from 'src/models/mysql/mysql.index';
import { DataSource, DataSourceOptions } from 'typeorm';

export class MysqlConfig implements TypeOrmOptionsFactory {
  get mysqlDataSource() {
    return this.createDataSource();
  }

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    let options: DataSourceOptions;
    options = {
      name: 'mysql_db',
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWD,
      database: process.env.MYSQL_DB_NAME,
      port: 3306,
      logging: true,
      entities: mysqlEntities,
      autoLoadEntities: true,
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
