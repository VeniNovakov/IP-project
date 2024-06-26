"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./services/auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const users_module_1 = require("../users/users.module");
const dist_1 = require("@nestjs/jwt/dist");
const jwtAt_strategy_1 = require("./strategies/jwtAt.strategy");
const jwtRt_strategy_1 = require("./strategies/jwtRt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            dist_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '5m' },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwtAt_strategy_1.StrategyJwtAT, jwtRt_strategy_1.StrategyJwtRT],
        exports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map