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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const documents_entity_1 = require("../entities/documents.entity");
const permission_entity_1 = require("../../permissions/entities/permission.entity");
let DocumentService = class DocumentService {
    constructor(documentRepository, permissionRepository) {
        this.documentRepository = documentRepository;
        this.permissionRepository = permissionRepository;
    }
    async createDocument(ownerId) {
        try {
            const document = new documents_entity_1.Document();
            document.owner.id = ownerId;
            return await this.documentRepository.save(document);
        }
        catch (error) {
            throw new Error('Failed to create document');
        }
    }
    async findById(id, userId) {
        const document = await this.documentRepository.findOne({
            where: { id: id },
        });
        if (!document) {
            return undefined;
        }
        const userPermission = await this.permissionRepository.findOne({
            where: { document, user: { id: userId } },
        });
        if ((!userPermission || !userPermission.canView || !userPermission.canEdit) &&
            document.owner.id != userId) {
            return undefined;
        }
        return document;
    }
    async updateContent(userId, documentId, content) {
        const document = await this.documentRepository.findOne({
            where: { id: documentId },
        });
        if (!document) {
            throw new Error('Document not found');
        }
        const userPermission = await this.permissionRepository.findOne({
            where: { document, user: { id: userId } },
        });
        if (!userPermission || !userPermission.canEdit) {
            throw new Error('User does not have permission to edit this document');
        }
        document.content = content;
        return this.documentRepository.save(document);
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documents_entity_1.Document)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentService);
//# sourceMappingURL=document.service.js.map