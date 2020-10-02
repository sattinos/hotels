import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';

describe('Admin Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AdminController = module.get<AdminController>(AdminController);
    expect(controller).toBeDefined();
  });
});
