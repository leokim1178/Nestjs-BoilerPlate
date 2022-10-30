import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// mongoDB example schema
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class MongoUser {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}
