"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = void 0;
const config_1 = require("@nestjs/config");
const path = require("path");
exports.typeOrmAsyncConfig = {
    useFactory: async (configService) => ({
        type: 'postgres',
        synchronize: false,
        migrationsTableName: 'migrations',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        migrations: [path.join(__dirname, '..', 'src', 'migrations', '*.ts')],
        entities: [
            path.join(__dirname, '..', '**', 'entities', '*.entity{.ts,.js}'),
        ],
    }),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=typeorm.config.js.map