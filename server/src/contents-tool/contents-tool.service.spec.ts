import { Test, TestingModule } from '@nestjs/testing';
import { FileMetaInfo } from './contents-tool.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsToolService } from './contents-tool.service';
import { ContentsToolController } from './contents-tool.controller';

describe('ContentsToolService', () => {
  let service: ContentsToolService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([FileMetaInfo]),
      ],
      controllers: [ContentsToolController],
      providers: [ContentsToolService],
    }).compile();
    service = module.get<ContentsToolService>(ContentsToolService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the count of files', async () => {
    const count = await service.getCount();
    expect(count).toBeGreaterThan(0);
  });
});
