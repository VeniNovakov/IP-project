import { Permission } from 'src/permissions/entities/permission.entity';
import { Document } from 'src/documents/entities/documents.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    refresh_token: string;
    documents: Document[];
    permissions: Permission[];
    comparePassword(password: string): Promise<boolean>;
}
