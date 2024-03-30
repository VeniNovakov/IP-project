// permission.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Document } from 'src/documents/entities/documents.entity';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Document)
  document: Document;

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canEdit: boolean;
}
