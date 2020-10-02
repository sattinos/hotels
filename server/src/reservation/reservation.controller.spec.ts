import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity, ReservationStatus } from './reservation.entity';
import { UserModule } from '../user/user.module';
import { FlatModule } from '../flat/flat.module';
import { RelationInfo } from '../lib/crud/crud-service';
import axios from 'axios';

describe('Reservation Controller', () => {
  let module: TestingModule;
  let controller: ReservationController;
  let createdReservation: ReservationEntity;

  const baseUrl = 'http://127.0.0.1:3000';
  const reservationRouteUrl = `${baseUrl}/reservations`;
  const createUrlExtended = `${reservationRouteUrl}/ex`;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ReservationService],
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReservationEntity]), UserModule, FlatModule],
      controllers: [ReservationController]
    }).compile();
  });

  it('should be defined', () => {
    controller = module.get<ReservationController>(ReservationController);
    expect(controller).toBeDefined();
  });

  it('should create successfully', async () => {
    const fromDate = new Date(Date.now());
    const toDate = new Date(Date.now());
    toDate.setDate(toDate.getDate() + 7);

    // tslint:disable-next-line:no-console
    console.log('fromDate: ', fromDate);

    // tslint:disable-next-line:no-console
    console.log('toDate:', toDate);

    const reservationSample = {
      status: ReservationStatus.InReview,
      from: fromDate,
      to: toDate,
      channel: 'Internet'
    };

    const reservationRelations: RelationInfo[] = [
      { fieldName: 'flats', ids: [1] },
      { fieldName: 'reservers', ids: [5] }
    ];

    const res = await axios({
      method: 'post',
      url: createUrlExtended,
      data: {
        entity: reservationSample,
        relations: reservationRelations
      }
    });
    expect(res.status).toBe(201);
    createdReservation = res.data;
    expect(createdReservation).toBeDefined();
    expect(createdReservation).toHaveProperty('id');
    expect(createdReservation.channel).toEqual(reservationSample.channel);
  });
});
