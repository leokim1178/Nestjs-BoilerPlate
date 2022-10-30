import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

@Injectable()
export class MongoDBConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    const options: MongooseModuleOptions = {
      uri: this.configService.get('MONGO_DB_HOST'),
      user: this.configService.get('MONGO_DB_USER'),
      pass: this.configService.get('MONGO_DB_PASSWORD'),
    };
    const mongoose = new Mongoose(options);
    if (mongoose.connections.length !== 0) {
      mongoose.disconnect();
    }

    return options;
  }
}
