import { PermissionService } from '../../permissions/services/permissions.service';
import { Permission } from '../entities/permission.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { DocumentService } from 'src/documents/services/document.service';
export declare class PermissionController {
    private readonly permissionService;
    private readonly usersService;
    private readonly docService;
    constructor(permissionService: PermissionService, usersService: UsersService, docService: DocumentService);
    createPermission(userId: number, documentId: number, canView: boolean, canEdit: boolean, req: any): Promise<Permission>;
    updatePermission(userId: number, documentId: number, canView: boolean, canEdit: boolean, req: any): Promise<Permission>;
    deletePermission(userId: number, documentId: number, req: any): Promise<void>;
}
