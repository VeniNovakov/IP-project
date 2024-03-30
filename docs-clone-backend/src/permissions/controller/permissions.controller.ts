import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionService } from '../../permissions/services/permissions.service';

import { Permission } from '../entities/permission.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { DocumentService } from 'src/documents/services/document.service';

@Controller('permissions')
@UseGuards(AuthGuard('jwt'))
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly usersService: UsersService,
    private readonly docService: DocumentService,
  ) {}

  @Post()
  async createPermission(
    @Body('userId') userId: number,
    @Body('documentId') documentId: number,
    @Body('canView') canView: boolean,
    @Body('canEdit') canEdit: boolean,
    @Req() req,
  ): Promise<Permission> {
    const user = await this.usersService.getUserById(userId);
    const document = await this.docService.findById(documentId, req.user.id);
    if (!user || !document) {
      throw new NotFoundException('User or document not found');
    }
    return this.permissionService.createPermission(
      user,
      document,
      canView,
      canEdit,
    );
  }

  @Put()
  async updatePermission(
    @Body('userId') userId: number,
    @Body('documentId') documentId: number,
    @Body('canView') canView: boolean,
    @Body('canEdit') canEdit: boolean,
    @Req() req,
  ): Promise<Permission> {
    const currentUser = req.user;
    if (currentUser.id !== userId) {
      throw new ForbiddenException('Unauthorized');
    }
    const user = await this.usersService.getUserById(userId);
    const document = await this.docService.findById(documentId, userId);
    if (!user || !document) {
      throw new NotFoundException('User or document not found');
    }
    return this.permissionService.updatePermission(
      user,
      document,
      canView,
      canEdit,
    );
  }

  @Delete()
  async deletePermission(
    @Body('userId') userId: number,
    @Body('documentId') documentId: number,
    @Req() req,
  ): Promise<void> {
    const currentUser = req.user;
    if (currentUser.id !== userId) {
      throw new ForbiddenException('Unauthorized');
    }
    const user = await this.usersService.getUserById(userId);
    const document = await this.docService.findById(documentId, userId);
    if (!user || !document) {
      throw new NotFoundException('User or document not found');
    }
    return this.permissionService.deletePermission(user, document);
  }
}
