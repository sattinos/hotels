import { ContentsToolController } from './contents-tool.controller';
import { ContentsToolService } from './contents-tool.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileMetaInfo } from './contents-tool.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe('ContentsTool Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([FileMetaInfo]),
      ],
      controllers: [ContentsToolController],
      providers: [ContentsToolService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ContentsToolController = module.get<
      ContentsToolController
    >(ContentsToolController);
    expect(controller).toBeDefined();
  });
});
