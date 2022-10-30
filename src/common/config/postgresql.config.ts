import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresEntities } from 'src/models/postgres/mysql.index';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class PostgresqlConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    let options: DataSourceOptions;
    options = {
      name: 'postgresql_DB',
      type: 'postgres',
      host: this.configService.get('PG_DB_HOST'),
      username: this.configService.get('PG_DB_USER'),
      password: this.configService.get('PG_DB_PASSWD'),
      database: this.configService.get('PG_DB_NAME'),
      port: 5432,
      logging: true,
      autoLoadEntities: true,
      entities: PostgresEntities,
      synchronize: true,
    } as DataSourceOptions;

    const dataSource = new DataSource(options);

    if (dataSource.isInitialized) {
      options = dataSource.options;
      await dataSource.destroy();
    }

    return options;
  }
}
