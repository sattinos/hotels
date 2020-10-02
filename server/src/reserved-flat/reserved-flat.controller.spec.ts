import { Test, TestingModule } from '@nestjs/testing';
import { ReservedFlatController } from './reserved-flat.controller';

describe('ReservedFlat Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ReservedFlatController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ReservedFlatController = module.get<ReservedFlatController>(ReservedFlatController);
    expect(controller).toBeDefined();
  });
});
