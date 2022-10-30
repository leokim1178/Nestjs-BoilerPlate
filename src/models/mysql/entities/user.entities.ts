import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MysqlUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
