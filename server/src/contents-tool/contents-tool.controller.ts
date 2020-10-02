import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  FilesInterceptor,
  UploadedFiles,
  Logger,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, resolve, basename } from 'path';
import { FileMetaInfo } from './contents-tool.entity';
import { ContentsToolService } from './contents-tool.service';

@Controller('contents-tool')
export class ContentsToolController {
  constructor(private readonly service: ContentsToolService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: resolve('./data/uploaded-files'),
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          const name = basename(file.originalname, ext);
          cb(null, `${name + '-' + Date.now()}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() fileMetaInfo: FileMetaInfo) {
    const createdFile = await this.service.create(fileMetaInfo);
    const name = basename(createdFile.path);
    return {
      name,
      id: createdFile.id,
    };
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: resolve('./data/uploaded-files'),
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          const name = basename(file.originalname, ext);
          cb(null, `${name + '-' + Date.now()}${ext}`);
        },
      }),
    })
  )
  async uploadFiles(@UploadedFiles() files: FileMetaInfo[]) {
    const res: {name: string, id: number}[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < files.length; index++) {
      const fileMetaInfo = files[index];
      const createdFile = await this.service.create(fileMetaInfo);
      const name = basename(createdFile.path);
      res.push({
        name,
        id: createdFile.id,
      });
    }
    return res;
  }
}
