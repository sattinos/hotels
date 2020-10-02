import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { ReservationEntity, ReservationStatus } from './reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';

import { UserModule } from '../user/user.module';
import { ReservedFlatModule } from '../reserved-flat/reserved-flat.module';

describe('ReservationService', () => {
  let service: ReservationService;
  const sampleReservation = {
    status: ReservationStatus.New,
    from: new Date(Date.now()),
    to: new Date(Date.now()),
    channel: 'internet'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReservationEntity]), ReservedFlatModule, UserModule],
      providers: [ReservationService],
      controllers: [ReservationController],
      exports: [ReservationService]
    }).compile();
    service = module.get<ReservationService>(ReservationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.reservedFlatService).toBeDefined();
    expect(service.userService).toBeDefined();
  });
  /*
  it('create a reservation entity', async () => {
    const reservation = new ReservationEntity();
    Object.assign(reservation, sampleReservation);
    const createdReservation = await service.create(reservation, [
      { fieldName: 'flats', ids: [1, 2] },
      { fieldName: 'reservers', ids: [5, 6] }
    ]);
    expect(createdReservation).toBeDefined();
  });
  */

  it('view a reservation entity', async () => {
    const aReservation = await service.getOne(30);

    // tslint:disable-next-line:no-console
    console.log('aReservation:', aReservation);
  });
});
