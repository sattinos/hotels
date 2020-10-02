import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';

describe('Room Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RoomController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RoomController = module.get<RoomController>(RoomController);
    expect(controller).toBeDefined();
  });
});
