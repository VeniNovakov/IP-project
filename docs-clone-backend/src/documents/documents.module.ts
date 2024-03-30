import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './controllers/documents.controller';
import { DocumentService } from './services/document.service';
import { JwtAtAuthGuard } from 'src/auth/guards/jwtAtAuth.guard';
import { JwtRtAuthGuard } from 'src/auth/guards/jwtRtAuthGuard.guard';
import { Document } from './entities/documents.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { DocumentGateway } from './gateways/documents.gateway';
import { PermissionService } from 'src/permissions/services/permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Permission])],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    PermissionService,
    DocumentGateway,
    JwtAtAuthGuard,
    JwtRtAuthGuard,
  ],
  exports: [TypeOrmModule],
})
export class DocumentsModule {}
