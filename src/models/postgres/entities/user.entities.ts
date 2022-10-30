import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostgresUser {
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
