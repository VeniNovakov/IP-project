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
exports.DocumentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const document_service_1 = require("../services/document.service");
const permissions_service_1 = require("../../permissions/services/permissions.service");
const common_1 = require("@nestjs/common");
let DocumentGateway = class DocumentGateway {
    constructor(documentService, permService) {
        this.documentService = documentService;
        this.permService = permService;
    }
    async handleJoinDocumentRoom(client, { documentId, userId }) {
        try {
            const document = await this.documentService.findById(parseInt(documentId, 10), client.data.userId);
            if (!document) {
                client.emit('document-error', 'document not found');
                return;
            }
            const perms = await this.permService.getPermissionForUser(document, userId);
            if (perms.canView == false ||
                perms.canEdit == false ||
                document.owner.id != userId) {
                throw new common_1.UnauthorizedException('User does not have edit permission');
            }
            client.join(documentId);
            client.emit('document-content', document.content);
        }
        catch (error) {
            console.error('Error joining document room:', error);
            client.emit('document-error', error.message || 'An error occurred while joining the document room');
        }
    }
    async handleUpdateDocumentContent(client, { documentId, userId, delta, }) {
        try {
            const document = await this.documentService.findById(parseInt(documentId, 10), userId);
            const perms = await this.permService.getPermissionForUser(document, userId);
            if (perms.canEdit == false || document.owner.id != userId) {
                throw new common_1.UnauthorizedException('User does not have edit permission');
            }
            this.server.to(documentId).emit('receive-changes', delta);
        }
        catch (error) {
            console.error('Error updating document content:', error);
            client.emit('document-error', error.message || 'An error occurred while updating document content');
        }
    }
    async handleSaveDocumentContent(client, { documentId, content }) {
        try {
            const document = await this.documentService.findById(parseInt(documentId, 10), client.data.userId);
            if (!document) {
                throw new common_1.NotFoundException('Document not found');
            }
            this.documentService.updateContent(client.data.userId, parseInt(documentId, 10), content);
            this.server.to(documentId).emit('document-saved');
        }
        catch (error) {
            console.error('Error saving document content:', error);
            client.emit('document-error', error.message || 'An error occurred while saving document content');
        }
    }
};
exports.DocumentGateway = DocumentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DocumentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-document-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], DocumentGateway.prototype, "handleJoinDocumentRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-changes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], DocumentGateway.prototype, "handleUpdateDocumentContent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('save-document'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], DocumentGateway.prototype, "handleSaveDocumentContent", null);
exports.DocumentGateway = DocumentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [document_service_1.DocumentService,
        permissions_service_1.PermissionService])
], DocumentGateway);
//# sourceMappingURL=documents.gateway.js.map