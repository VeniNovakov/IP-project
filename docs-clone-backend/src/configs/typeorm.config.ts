import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'VenElin@10321241/:',
  database: 'docs_db',
  entities: [User],
  synchronize: true,
};
