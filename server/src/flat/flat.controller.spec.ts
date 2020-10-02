import { FlatService } from './flat.service';
import { FlatEntity } from './flat.entity';
import { FlatController } from './flat.controller';
import { RoomModule } from './../rooms/room.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import axios from 'axios';
import { RelationInfo } from '../lib/crud/crud-service';
import { Logger } from '@nestjs/common';

describe('Flat Controller', () => {
  let module: TestingModule;
  let controller: FlatController;
  let createdFlat: FlatEntity;

  const baseUrl = 'http://127.0.0.1:3000';
  const flatRouteUrl = `${baseUrl}/flat`;
  const createUrlExtended = `${flatRouteUrl}/ex`;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([FlatEntity]), RoomModule],
      providers: [FlatService],
      controllers: [FlatController]
    }).compile();
  });

  it('should be defined', () => {
    controller = module.get<FlatController>(FlatController);
    expect(controller).toBeDefined();
  });

  it('create a flat entity', async () => {
    const flatSample = {
      name: 'name from api',
      images: [
        '/Volumes/LaCie/Hamah/hotel/rep/server/data/uploaded-files/cover2-1544892255438.png'
      ],
      price: 110,
      count: 10,
      area: 250,
      description: 'bed desc from api'
    };

    const flatRelations: RelationInfo[] = [
      { fieldName: 'bedRooms', ids: [8, 9, 10] },
      { fieldName: 'livingRooms', ids: [8, 10] },
      { fieldName: 'bathRooms', ids: [8, 10] },
      { fieldName: 'kitchens', ids: [8, 10] }
    ];

    const res = await axios({
      method: 'post',
      url: createUrlExtended,
      data: {
        entity: flatSample,
        relations: flatRelations
      }
    });
    expect(res.status).toBe(201);
    createdFlat = res.data;
    expect(createdFlat).toBeDefined();
    expect(createdFlat).toHaveProperty('id');
    expect(createdFlat.name).toEqual(flatSample.name);
  });

  it('it should read the flat with its relations successfully', async () => {
    const readResult = await axios({
      method: 'get',
      url: `${flatRouteUrl}/${createdFlat.id}`
    });
    expect(readResult.status).toBe(200);
    expect(readResult.data).toBeDefined();
    expect(readResult.data.bedRooms).toBeDefined();
    expect(readResult.data.bedRooms).toHaveProperty('length');
    expect(readResult.data.bedRooms.length > 0).toEqual(true);
    expect(readResult.data.bedRooms[0]).toHaveProperty('id');
    expect(readResult.data.bedRooms[0]).toHaveProperty('bedsIDs');

    Logger.log(`-------------`);
    Logger.log(`read flatID: ${createdFlat.id}`);
    Logger.log(readResult.data);
    Logger.log(`-------------`);
  });
});
