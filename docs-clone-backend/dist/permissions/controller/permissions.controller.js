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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const permissions_service_1 = require("../../permissions/services/permissions.service");
const users_service_1 = require("../../users/services/users/users.service");
const document_service_1 = require("../../documents/services/document.service");
let PermissionController = class PermissionController {
    constructor(permissionService, usersService, docService) {
        this.permissionService = permissionService;
        this.usersService = usersService;
        this.docService = docService;
    }
    async createPermission(userId, documentId, canView, canEdit, req) {
        const user = await this.usersService.getUserById(userId);
        const document = await this.docService.findById(documentId, req.user.id);
        if (!user || !document) {
            throw new common_1.NotFoundException('User or document not found');
        }
        return this.permissionService.createPermission(user, document, canView, canEdit);
    }
    async updatePermission(userId, documentId, canView, canEdit, req) {
        const currentUser = req.user;
        if (currentUser.id !== userId) {
            throw new common_1.ForbiddenException('Unauthorized');
        }
        const user = await this.usersService.getUserById(userId);
        const document = await this.docService.findById(documentId, userId);
        if (!user || !document) {
            throw new common_1.NotFoundException('User or document not found');
        }
        return this.permissionService.updatePermission(user, document, canView, canEdit);
    }
    async deletePermission(userId, documentId, req) {
        const currentUser = req.user;
        if (currentUser.id !== userId) {
            throw new common_1.ForbiddenException('Unauthorized');
        }
        const user = await this.usersService.getUserById(userId);
        const document = await this.docService.findById(documentId, userId);
        if (!user || !document) {
            throw new common_1.NotFoundException('User or document not found');
        }
        return this.permissionService.deletePermission(user, document);
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('documentId')),
    __param(2, (0, common_1.Body)('canView')),
    __param(3, (0, common_1.Body)('canEdit')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "createPermission", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('documentId')),
    __param(2, (0, common_1.Body)('canView')),
    __param(3, (0, common_1.Body)('canEdit')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "updatePermission", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('documentId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "deletePermission", null);
exports.PermissionController = PermissionController = __decorate([
    (0, common_1.Controller)('permissions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [permissions_service_1.PermissionService,
        users_service_1.UsersService,
        document_service_1.DocumentService])
], PermissionController);
//# sourceMappingURL=permissions.controller.js.map