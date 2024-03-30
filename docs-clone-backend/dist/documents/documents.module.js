"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const documents_controller_1 = require("./controllers/documents.controller");
const document_service_1 = require("./services/document.service");
const jwtAtAuth_guard_1 = require("../auth/guards/jwtAtAuth.guard");
const jwtRtAuthGuard_guard_1 = require("../auth/guards/jwtRtAuthGuard.guard");
const documents_entity_1 = require("./entities/documents.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const documents_gateway_1 = require("./gateways/documents.gateway");
const permissions_service_1 = require("../permissions/services/permissions.service");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([documents_entity_1.Document, permission_entity_1.Permission])],
        controllers: [documents_controller_1.DocumentController],
        providers: [
            document_service_1.DocumentService,
            permissions_service_1.PermissionService,
            documents_gateway_1.DocumentGateway,
            jwtAtAuth_guard_1.JwtAtAuthGuard,
            jwtRtAuthGuard_guard_1.JwtRtAuthGuard,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map