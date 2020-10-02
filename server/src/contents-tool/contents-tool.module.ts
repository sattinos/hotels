import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileMetaInfo } from './contents-tool.entity';
import { ContentsToolService } from './contents-tool.service';
import { ContentsToolController } from './contents-tool.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileMetaInfo])],
  providers: [ContentsToolService],
  controllers: [ContentsToolController],
  exports: [ContentsToolService],
})
export class ContentsToolModule {}
