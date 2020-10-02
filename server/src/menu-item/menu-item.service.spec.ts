import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemService } from './menu-item.service';

describe('MenuItemService', () => {
  let service: MenuItemService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuItemService],
    }).compile();
    service = module.get<MenuItemService>(MenuItemService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
