"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyJwtRT = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_config_1 = require("../../config/auth.config");
let StrategyJwtRT = class StrategyJwtRT extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refresh-jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: auth_config_1.TokenConfig.rt,
            passReqToCallback: true,
        });
    }
    async validate(req, payload) {
        var _a, _b;
        const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '')) === null || _b === void 0 ? void 0 : _b.trim();
        return Object.assign(Object.assign({}, payload), { token });
    }
};
exports.StrategyJwtRT = StrategyJwtRT;
exports.StrategyJwtRT = StrategyJwtRT = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StrategyJwtRT);
//# sourceMappingURL=jwtRt.strategy.js.map