import { BaseEntity } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Document } from 'src/documents/entities/documents.entity';
export declare class Permission extends BaseEntity {
    id: number;
    user: User;
    document: Document;
    canView: boolean;
    canEdit: boolean;
}
