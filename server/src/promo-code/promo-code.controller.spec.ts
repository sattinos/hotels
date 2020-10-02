import { Test, TestingModule } from '@nestjs/testing';
import { PromoCodeController } from './promo-code.controller';

describe('PromoCode Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PromoCodeController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PromoCodeController = module.get<PromoCodeController>(PromoCodeController);
    expect(controller).toBeDefined();
  });
});
