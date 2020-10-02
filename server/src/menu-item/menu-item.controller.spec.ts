import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemController } from './menu-item.controller';

describe('MenuItem Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MenuItemController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MenuItemController = module.get<MenuItemController>(MenuItemController);
    expect(controller).toBeDefined();
  });
});
