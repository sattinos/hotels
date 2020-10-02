import { Test, TestingModule } from '@nestjs/testing';
import { BedsController } from './beds.controller';

describe('Beds Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [BedsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: BedsController = module.get<BedsController>(BedsController);
    expect(controller).toBeDefined();
  });
});
