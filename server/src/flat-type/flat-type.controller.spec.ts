import { Test, TestingModule } from '@nestjs/testing';
import { FlatTypeController } from './flat-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatTypeEntity } from './flat-type.entity';
import { RoomModule } from '../rooms/room.module';
import { FlatModule } from '../flat/flat.module';
import { ReservedFlatModule } from '../reserved-flat/reserved-flat.module';
import { FlatTypeService } from './flat-type.service';
import { UserModule } from '../user/user.module';
import { ReservationModule } from '../reservation/reservation.module';

describe('FlatType Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
  });

  it('should be defined', () => {
    const controller: FlatTypeController = module.get<FlatTypeController>(FlatTypeController);
    expect(controller).toBeDefined();
  });
});
