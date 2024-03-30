// permission.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Document } from 'src/documents/entities/documents.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(
    user: User,
    document: Document,
    canView: boolean,
    canEdit: boolean,
  ): Promise<Permission> {
    const permission = this.permissionRepository.create({
      user,
      document,
      canView,
      canEdit,
    });
    return this.permissionRepository.save(permission);
  }

  async updatePermission(
    user: User,
    document: Document,
    canView: boolean,
    canEdit: boolean,
  ): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { user, document },
    });
    if (!permission) {
      throw new Error('Permission not found');
    }

    if (document.owner.id !== user.id) {
      throw new Error('Only the owner can update permissions');
    }

    permission.canView = canView;
    permission.canEdit = canEdit;
    return this.permissionRepository.save(permission);
  }

  async deletePermission(user: User, document: Document): Promise<void> {
    const permission = await this.permissionRepository.findOne({
      where: { user, document },
    });
    if (!permission) {
      throw new Error('Permission not found');
    }

    // Only the owner can delete permissions
    if (document.owner.id !== user.id) {
      throw new Error('Only the owner can delete permissions');
    }

    await this.permissionRepository.delete(permission.id);
  }

  async getPermissions(document: Document): Promise<Permission[]> {
    return this.permissionRepository.find({ where: { document } });
  }
  async getPermissionForUser(
    document: Document,
    userId: number,
  ): Promise<Permission> {
    return this.permissionRepository.findOne({
      where: { document, user: { id: userId } },
    });
  }
}
