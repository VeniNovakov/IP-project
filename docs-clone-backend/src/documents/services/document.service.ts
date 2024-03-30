import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/documents.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createDocument(ownerId: number): Promise<Document> {
    try {
      const document = new Document();
      document.owner.id = ownerId;
      return await this.documentRepository.save(document);
    } catch (error) {
      throw new Error('Failed to create document');
    }
  }

  async findById(id: number, userId: number): Promise<Document | undefined> {
    const document = await this.documentRepository.findOne({
      where: { id: id },
    });

    if (!document) {
      return undefined;
    }

    const userPermission = await this.permissionRepository.findOne({
      where: { document, user: { id: userId } },
    });

    if (
      (!userPermission || !userPermission.canView || !userPermission.canEdit) &&
      document.owner.id != userId
    ) {
      return undefined;
    }

    return document;
  }

  async updateContent(
    userId: number,
    documentId: number,
    content: string,
  ): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id: documentId },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    const userPermission = await this.permissionRepository.findOne({
      where: { document, user: { id: userId } },
    });
    if (!userPermission || !userPermission.canEdit) {
      throw new Error('User does not have permission to edit this document');
    }

    document.content = content;
    return this.documentRepository.save(document);
  }
}
