import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import * as path from 'path';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    synchronize: false,
    migrationsTableName: 'migrations',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    database: configService.get<string>('DATABASE_NAME'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    migrations: [path.join(__dirname, '..', 'src', 'migrations', '*.ts')],
    entities: [
      path.join(__dirname, '..', '**', 'entities', '*.entity{.ts,.js}'),
    ],
  }),
  inject: [ConfigService],
};
