import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Document } from 'src/documents/entities/documents.entity';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    createPermission(user: User, document: Document, canView: boolean, canEdit: boolean): Promise<Permission>;
    updatePermission(user: User, document: Document, canView: boolean, canEdit: boolean): Promise<Permission>;
    deletePermission(user: User, document: Document): Promise<void>;
    getPermissions(document: Document): Promise<Permission[]>;
    getPermissionForUser(document: Document, userId: number): Promise<Permission>;
}
