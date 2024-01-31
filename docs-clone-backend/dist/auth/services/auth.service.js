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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../typeorm/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const auth_config_1 = require("../../configs/auth.config");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async hashToken(data) {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hash(data, salt);
        return hash;
    }
    async validateUser(name, password) {
        const user = await this.userRepository.findOneBy({ name });
        if (user && (await user.comparePassword(password))) {
            const payload = {
                name: user.name,
                sub: user.id,
            };
            const tokens = await this.tokens(user);
            await this.updateToken(user.id, tokens.refresh_token);
            return {
                code: 200,
                tokens: tokens,
            };
        }
        return null;
    }
    async tokens(user) {
        const payload = {
            name: user.name,
            sub: user.id,
            products: user.productids,
        };
        const accToken = await this.jwtService.signAsync(payload, {
            expiresIn: 60 * 30,
            secret: auth_config_1.TokenConfig.at,
        });
        const refrToken = await this.jwtService.signAsync(payload, {
            expiresIn: 60 * 60 * 24 * 15,
            secret: auth_config_1.TokenConfig.rt,
        });
        return {
            access_token: accToken,
            refresh_token: refrToken,
        };
    }
    async createUser(userDetails) {
        if ((await this.userRepository.findOneBy({ name: userDetails.name })) != null) {
            return { code: 403, message: 'Theres already a user with this name' };
        }
        const salt = await bcrypt.genSalt();
        userDetails.password = await bcrypt.hash(userDetails.password, salt);
        const newUser = await this.userRepository.create(Object.assign({}, userDetails));
        await this.userRepository.save(newUser);
        const tokens = await this.tokens(newUser);
        await this.updateToken(newUser.id, tokens.refresh_token);
        console.log(tokens);
        return { code: 200, tokens };
    }
    async updateToken(uid, token) {
        const hash = await this.hashToken(token);
        const user = await this.userRepository.findOneBy({ id: uid });
        user.refresh_token = hash;
        await this.userRepository.save(user);
    }
    async logout(uid) {
        const user = await this.userRepository.findOneBy({ id: uid });
        user.refresh_token = null;
        await this.userRepository.save(user);
        return { code: 200 };
    }
    async refresh(uid, token) {
        const user = await this.userRepository.findOneBy({ id: uid });
        if (bcrypt.compare(token, user.refresh_token)) {
            return { code: 401 };
        }
        const tokens = await this.tokens(user);
        await this.updateToken(user.id, tokens.refresh_token);
        return { code: 200 };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map