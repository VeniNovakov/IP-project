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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const CreateUser_dto_1 = require("../../users/dtos/CreateUser.dto");
const dotenv = require("dotenv");
const path_1 = require("path");
const passport_1 = require("@nestjs/passport");
dotenv.config({ path: (0, path_1.join)(__dirname, '..', '/src', '/.env') });
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(b, res, req) {
        const tokenJ = await this.authService.validateUser(b['name'], b['password']);
        if (tokenJ == null) {
            res.status(common_1.HttpStatus.UNAUTHORIZED).send('Wrong login credentials');
            return;
        }
        res.cookie(process.env.COOKIE_NAME, tokenJ.tokens.access_token, {
            httpOnly: false,
            sameSite: 'Lax',
            expires: new Date(new Date().getTime() + 300000),
        });
        return res.status(common_1.HttpStatus.OK).json(tokenJ.tokens);
    }
    async register(createUserDto) {
        return await this.authService.createUser(createUserDto);
    }
    async logout(req) {
        return await this.authService.logout(req.user.sub);
    }
    async refresh(req) {
        return await this.authService.refresh(req.user['sub'], req.user['token']);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('access-jwt')),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('refresh-jwt')),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map