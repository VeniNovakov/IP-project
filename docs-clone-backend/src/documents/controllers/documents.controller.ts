// document.controller.ts

import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { Document } from '../entities/documents.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseGuards(AuthGuard('access-jwt'))
  async createDocument(@Req() req): Promise<Document> {
    return this.documentService.createDocument(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('access-jwt'))
  async getDocument(@Param('id') id: string, @Req() req): Promise<Document> {
    const documentId = parseInt(id, 10);
    return this.documentService.findById(documentId, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('access-jwt'))
  async updateDocumentContent(
    @Param('id') id: string,
    @Body() content: string,
    @Req() req,
  ): Promise<Document> {
    const documentId = parseInt(id, 10);
    return this.documentService.updateContent(req.user.id, documentId, content);
  }
}
