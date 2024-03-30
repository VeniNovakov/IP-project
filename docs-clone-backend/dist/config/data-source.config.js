"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = new typeorm_1.DataSource({
    type: 'postgres',
    logging: false,
    synchronize: false,
    migrationsTableName: 'migrations',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
    entities: [path.join(__dirname, '..', '**', 'entities', '*.entity{.ts,.js}')],
});
exports.default = connectDB;
//# sourceMappingURL=data-source.config.js.map