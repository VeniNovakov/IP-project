import { Module } from '@nestjs/common';

import { PermissionController } from './controller/permissions.controller';
import { PermissionService } from './services/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { DocumentService } from 'src/documents/services/document.service';
import { Document } from 'src/documents/entities/documents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, User, Document])],
  controllers: [PermissionController],
  providers: [PermissionService, UsersService, DocumentService],
})
export class PermissionModule {}
