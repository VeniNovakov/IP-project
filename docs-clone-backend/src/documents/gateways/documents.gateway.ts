import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DocumentService } from '../services/document.service';
import { PermissionService } from 'src/permissions/services/permissions.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@WebSocketGateway()
export class DocumentGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly documentService: DocumentService,
    private readonly permService: PermissionService,
  ) {}

  @SubscribeMessage('join-document-room')
  async handleJoinDocumentRoom(
    client: Socket,
    { documentId, userId }: { documentId: string; userId: number },
  ) {
    try {
      const document = await this.documentService.findById(
        parseInt(documentId, 10),
        client.data.userId,
      );
      if (!document) {
        client.emit('document-error', 'document not found');
        return;
      }
      const perms = await this.permService.getPermissionForUser(
        document,
        userId,
      );
      if (
        perms.canView == false ||
        perms.canEdit == false ||
        document.owner.id != userId
      ) {
        throw new UnauthorizedException('User does not have edit permission');
      }
      client.join(documentId);
      client.emit('document-content', document.content);
    } catch (error) {
      console.error('Error joining document room:', error);
      client.emit(
        'document-error',
        error.message || 'An error occurred while joining the document room',
      );
    }
  }

  @SubscribeMessage('send-changes')
  async handleUpdateDocumentContent(
    client: Socket,
    {
      documentId,
      userId,
      delta,
    }: { documentId: string; userId: number; delta: any },
  ) {
    try {
      const document = await this.documentService.findById(
        parseInt(documentId, 10),
        userId,
      );

      const perms = await this.permService.getPermissionForUser(
        document,
        userId,
      );

      if (perms.canEdit == false || document.owner.id != userId) {
        throw new UnauthorizedException('User does not have edit permission');
      }

      this.server.to(documentId).emit('receive-changes', delta);
    } catch (error) {
      console.error('Error updating document content:', error);
      client.emit(
        'document-error',
        error.message || 'An error occurred while updating document content',
      );
    }
  }

  @SubscribeMessage('save-document')
  async handleSaveDocumentContent(
    client: Socket,
    { documentId, content }: { documentId: string; content: string },
  ) {
    try {
      const document = await this.documentService.findById(
        parseInt(documentId, 10),
        client.data.userId,
      );
      if (!document) {
        throw new NotFoundException('Document not found');
      }
      this.documentService.updateContent(
        client.data.userId,
        parseInt(documentId, 10),
        content,
      );

      this.server.to(documentId).emit('document-saved');
    } catch (error) {
      console.error('Error saving document content:', error);
      client.emit(
        'document-error',
        error.message || 'An error occurred while saving document content',
      );
    }
  }
}
