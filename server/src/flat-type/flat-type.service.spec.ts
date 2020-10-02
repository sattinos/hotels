import { Test, TestingModule } from '@nestjs/testing';
import { FlatTypeService } from './flat-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatTypeEntity } from './flat-type.entity';
import { FlatTypeController } from './flat-type.controller';
import { FlatModule } from '../flat/flat.module';
import { RoomModule } from '../rooms/room.module';
// import { RoomEntity, RoomType } from '../rooms/room.entity';
import { ReservedFlatModule } from '../reserved-flat/reserved-flat.module';
import { UserModule } from '../user/user.module';
import { ReservationModule } from '../reservation/reservation.module';

describe('FlatTypeService', () => {
  let service: FlatTypeService;
  const flatTypeStr = 'Delux';
  /*
  const sampleFlatType = {
    name: 'Small flat',
    description: 'new description',
    count: 2,
    price: 200,
    type: 'Normal',
    images: ['/Volumes/LaCie/Hamah/hotel/rep/server/data/uploaded-files/cover2-1544892255438.png'],
    area: 300
  };

  let createdFlatType: FlatTypeEntity;
  let updatedFlatType: FlatTypeEntity;

  const sampleRoom1 = { name: 'sample bedRoom1', type: RoomType.BedRoom, bedsIDs: ['54', '55'], description: 'desc1' };
  const sampleRoom2 = { name: 'sample bedRoom2', type: RoomType.LivingRoom, bedsIDs: ['56'], description: 'desc2' };

  let createdRoom1: RoomEntity;
  let createdRoom2: RoomEntity;
  */
  const fromDate = new Date();
  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 7);

  /*
        from: 2019-02-23T11:00:00.485Z,           to: 2019-02-28T11:00:00.485Z

        from: 2019-02-26T11:00:00.037Z,           to: 2019-02-28T11:00:00.037Z
   */

  const specificDate = new Date();
  specificDate.setMonth(1);
  specificDate.setDate(20);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([FlatTypeEntity]),
        RoomModule,
        FlatModule,
        ReservedFlatModule,
        ReservationModule,
        UserModule
      ],
      providers: [FlatTypeService],
      exports: [FlatTypeService],
      controllers: [FlatTypeController]
    }).compile();
    service = module.get<FlatTypeService>(FlatTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /*
    it('create FlatType Entity', async () => {
      const room1 = new RoomEntity();
      Object.assign(room1, sampleRoom1);
      createdRoom1 = await service.roomService.create(room1);
      // console.log('created room1:', createdRoom1);

      const room2 = new RoomEntity();
      Object.assign(room2, sampleRoom2);
      createdRoom2 = await service.roomService.create(room2);
      // console.log('created room2:', createdRoom2);

      const flatType = new FlatTypeEntity();
      Object.assign(flatType, sampleFlatType);

      createdFlatType = await service.create(flatType, [
        { fieldName: 'bedRooms', ids: [createdRoom1.id, createdRoom2.id] },
        { fieldName: 'livingRooms', ids: [createdRoom2.id] },
        { fieldName: 'bathRooms', ids: [createdRoom1.id] }
      ]);
      expect(createdFlatType).toBeDefined();
    });

    it('enlarge flat type entity count', async () => {
      // tslint:disable-next-line:no-console
      console.log('created:', createdFlatType);
      createdFlatType.count = createdFlatType.count + 1;
      updatedFlatType = await service.update(createdFlatType.id, createdFlatType);
      expect(updatedFlatType).toBeDefined();
      expect(updatedFlatType.count === createdFlatType.count).toEqual(true);
    });
  */
  /*
  it('get available flats', async () => {
    const availableFlats = await service.getAvailableFlats(new Date(), createdFlatType.type);
    expect(availableFlats).toBeDefined();
    expect(availableFlats.length === updatedFlatType.count).toEqual(true);
  });
  */
  /*
    it('perform a reservation', async () => {
      const reservation = await service.reserve(fromDate, toDate, 1, createdFlatType.type, 5);
      expect(reservation).toBeDefined();
    });
  */
  /*
  it('delete all the flats', async () => {
    await service.delete((updatedFlatType as any).id);
  });
  */

  it('see reserved flats', async () => {
    const flatType = await service.getFlatType(flatTypeStr);
    expect(flatType).toBeDefined();
    const reservedFlats = await service.reservedFlatService.getReservedFlatsFor(specificDate, flatType);
    // tslint:disable-next-line:no-console
    console.log('reserved flats at ', specificDate);

    // tslint:disable-next-line:no-console
    console.log('count:', reservedFlats.length);
  });
});

/*
 DELETE
FROM reserved_flat_entity;

DELETE
FROM reservation_entity;

DELETE
FROM flat_entity;

DELETE
FROM flat_type_entity
 */
