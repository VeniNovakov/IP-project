"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const permissions_controller_1 = require("./controller/permissions.controller");
const permissions_service_1 = require("./services/permissions.service");
const typeorm_1 = require("@nestjs/typeorm");
const permission_entity_1 = require("./entities/permission.entity");
const users_service_1 = require("../users/services/users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
const document_service_1 = require("../documents/services/document.service");
const documents_entity_1 = require("../documents/entities/documents.entity");
let PermissionModule = class PermissionModule {
};
exports.PermissionModule = PermissionModule;
exports.PermissionModule = PermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([permission_entity_1.Permission, user_entity_1.User, documents_entity_1.Document])],
        controllers: [permissions_controller_1.PermissionController],
        providers: [permissions_service_1.PermissionService, users_service_1.UsersService, document_service_1.DocumentService],
    })
], PermissionModule);
//# sourceMappingURL=permission.module.js.map