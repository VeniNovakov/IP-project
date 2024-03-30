import { BaseEntity } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';
export declare class Document extends BaseEntity {
    id: number;
    content: string;
    owner: User;
    permissions: Permission[];
}
