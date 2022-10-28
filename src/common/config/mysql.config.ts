import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class MysqlConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    let options: DataSourceOptions;
    options = {
      name: 'mysql_DB',
      type: 'mysql',
      host: this.configService.get('MYSQL_DB_HOST'),
      username: this.configService.get('MYSQL_DB_USER'),
      password: this.configService.get('MYSQL_DB_PASSWD'),
      database: this.configService.get('MYSQL_DB_NAME'),
      port: 3306,
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
