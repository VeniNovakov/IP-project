import { Server, Socket } from 'socket.io';
import { DocumentService } from '../services/document.service';
import { PermissionService } from 'src/permissions/services/permissions.service';
export declare class DocumentGateway {
    private readonly documentService;
    private readonly permService;
    server: Server;
    constructor(documentService: DocumentService, permService: PermissionService);
    handleJoinDocumentRoom(client: Socket, { documentId, userId }: {
        documentId: string;
        userId: number;
    }): Promise<void>;
    handleUpdateDocumentContent(client: Socket, { documentId, userId, delta, }: {
        documentId: string;
        userId: number;
        delta: any;
    }): Promise<void>;
    handleSaveDocumentContent(client: Socket, { documentId, content }: {
        documentId: string;
        content: string;
    }): Promise<void>;
}
