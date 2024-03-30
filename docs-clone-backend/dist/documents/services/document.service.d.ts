import { Repository } from 'typeorm';
import { Document } from '../entities/documents.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
export declare class DocumentService {
    private readonly documentRepository;
    private readonly permissionRepository;
    constructor(documentRepository: Repository<Document>, permissionRepository: Repository<Permission>);
    createDocument(ownerId: number): Promise<Document>;
    findById(id: number, userId: number): Promise<Document | undefined>;
    updateContent(userId: number, documentId: number, content: string): Promise<Document>;
}
