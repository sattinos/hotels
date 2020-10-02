import { Test, TestingModule } from '@nestjs/testing';
import { PromoCodeService } from './promo-code.service';

describe('PromoCodeService', () => {
  let service: PromoCodeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoCodeService],
    }).compile();
    service = module.get<PromoCodeService>(PromoCodeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
