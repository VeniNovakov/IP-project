import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Document } from 'src/documents/entities/documents.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: 'varchar', default: 'error' })
  name!: string;

  @Column({ nullable: false, type: 'varchar', default: 'error' })
  email!: string;

  @Column({ nullable: false, type: 'varchar', default: 'error' })
  password!: string;

  @Column({ nullable: true, type: 'varchar', default: 'error' })
  refresh_token!: string;

  @OneToMany(() => Document, (document) => document.owner)
  documents: Document[];

  @OneToMany(() => Permission, (permission) => permission.user)
  permissions: Permission[];

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
