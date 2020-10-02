import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class FileMetaInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  encoding: string;

  @Column({ length: 20 })
  mimetype: string;

  @Column('int')
  size: number;

  @Column({ unique: true })
  path: string;

  @CreateDateColumn()
  uploadedAt: Date;
}

export interface FileInfo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
