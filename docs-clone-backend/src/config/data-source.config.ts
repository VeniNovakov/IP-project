import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const connectDB = new DataSource({
  type: 'postgres',
  logging: false,
  synchronize: false,
  migrationsTableName: 'migrations',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD as string,
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  entities: [path.join(__dirname, '..', '**', 'entities', '*.entity{.ts,.js}')],
});

export default connectDB;
