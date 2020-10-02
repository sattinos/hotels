import { Test, TestingModule } from '@nestjs/testing';
import { ReservationLogService } from './reservation-log.service';

describe('ReservationLogService', () => {
  let service: ReservationLogService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationLogService],
    }).compile();
    service = module.get<ReservationLogService>(ReservationLogService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
