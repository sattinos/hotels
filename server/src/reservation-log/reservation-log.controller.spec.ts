import { Test, TestingModule } from '@nestjs/testing';
import { ReservationLogController } from './reservation-log.controller';

describe('ReservationLog Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ReservationLogController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ReservationLogController = module.get<ReservationLogController>(ReservationLogController);
    expect(controller).toBeDefined();
  });
});
