"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("../typeorm/entities/user.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'VenElin@10321241/:',
    database: 'docs_db',
    entities: [user_entity_1.User],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map