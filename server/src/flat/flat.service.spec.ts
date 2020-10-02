import { RoomModule } from './../rooms/room.module';
import { Test, TestingModule } from '@nestjs/testing';
import { FlatService } from './flat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatEntity } from './flat.entity';
import { FlatController } from './flat.controller';
import { RoomEntity, RoomType } from '../rooms/room.entity';

describe('FlatService', () => {
  let flatService: FlatService;
  let createdRoom1: RoomEntity;
  let createdRoom2: RoomEntity;

  let createdFlat: FlatEntity;
  const sampleRoom1 = { name: 'sample bedRoom1', type: RoomType.BedRoom, bedsIDs: ['54', '55'], description: 'desc1' };
  const sampleRoom2 = { name: 'sample bedRoom2', type: RoomType.LivingRoom, bedsIDs: ['56'], description: 'desc2' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([FlatEntity]), RoomModule],
      providers: [FlatService],
      controllers: [FlatController]
    }).compile();
    flatService = module.get<FlatService>(FlatService);
  });

  it('should be defined', () => {
    expect(flatService).toBeDefined();
    expect(flatService.roomService).toBeDefined();
  });

  it('create Flat Entity', async () => {
    const room1 = new RoomEntity();
    Object.assign(room1, sampleRoom1);
    createdRoom1 = await flatService.roomService.create(room1);

    const room2 = new RoomEntity();
    Object.assign(room2, sampleRoom2);
    createdRoom2 = await flatService.roomService.create(room2);

    const flat = new FlatEntity();
    Object.assign(flat, {
      name: 'flat name here',
      images: ['/Volumes/LaCie/Hamah/hotel/rep/server/data/uploaded-files/cover2-1544892255438.png'],
      price: 100,
      count: 100,
      area: 200,
      description: 'a sample description'
    });

    createdFlat = await flatService.create(flat, [
      { fieldName: 'bedRooms', ids: [createdRoom1.id, createdRoom2.id] },
      { fieldName: 'livingRooms', ids: [createdRoom2.id] },
      { fieldName: 'bathRooms', ids: [createdRoom1.id] }
    ]);

    expect(createdFlat).toBeDefined();
    expect(createdFlat.bedRooms).toEqual([createdRoom1]);
    const queriedRoom = await flatService.getOne(createdFlat.id);
    expect(queriedRoom).toBeDefined();
    expect(queriedRoom.bedRooms).toBeDefined();
    expect(queriedRoom.bedRooms).toEqual(createdFlat.bedRooms);
  });

  it('should successfully update', async () => {
    createdFlat.description = 'updated';
    createdFlat.price = 150;
    const updatedRoom = await flatService.update(createdFlat.id, createdFlat, [{ fieldName: 'bedRooms', ids: [5, 4] }]);
    const queriedRoom = await flatService.getOne(updatedRoom.id);
    expect(queriedRoom).toBeDefined();
    expect(queriedRoom.bedRooms).toBeDefined();
    expect(queriedRoom.bedRooms).toEqual(updatedRoom.bedRooms);
    expect(queriedRoom.price).toEqual(createdFlat.price);
  });
});
