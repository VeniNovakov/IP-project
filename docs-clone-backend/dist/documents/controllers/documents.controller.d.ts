import { DocumentService } from '../services/document.service';
import { Document } from '../entities/documents.entity';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocument(req: any): Promise<Document>;
    getDocument(id: string, req: any): Promise<Document>;
    updateDocumentContent(id: string, content: string, req: any): Promise<Document>;
}
