import { Test, TestingModule } from '@nestjs/testing';
import { BedsService } from './beds.service';

describe('BedsService', () => {
  let service: BedsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedsService],
    }).compile();
    service = module.get<BedsService>(BedsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
