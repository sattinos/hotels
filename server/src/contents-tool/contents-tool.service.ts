import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileMetaInfo } from './contents-tool.entity';
import { CrudServiceOrm } from '../lib/crud/crud-service';

@Injectable()
export class ContentsToolService extends CrudServiceOrm<FileMetaInfo> {
  constructor(
    @InjectRepository(FileMetaInfo)
    protected readonly rep: Repository<FileMetaInfo>,
  ) {
    super(rep);
  }

  async findByPath(path: string): Promise<FileMetaInfo | undefined> {
    try {
      const metaInfo = await this.rep.findOne(
        { path },
        { select: ['id', 'encoding', 'mimetype', 'size', 'path'] },
      );
      return metaInfo;
    } catch (err) {
      Logger.error(`findByPath(err): ${err.message}`);
      return undefined;
    }
  }
}
