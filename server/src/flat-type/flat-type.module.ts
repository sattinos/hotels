import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatTypeService } from './flat-type.service';
import { FlatTypeEntity } from './flat-type.entity';
import { FlatModule } from '../flat/flat.module';
import { FlatTypeController } from './flat-type.controller';
import { RoomModule } from '../rooms/room.module';
import { ReservedFlatModule } from '../reserved-flat/reserved-flat.module';
import { ReservationModule } from '../reservation/reservation.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ TypeOrmModule.forFeature([FlatTypeEntity]), RoomModule, FlatModule, ReservedFlatModule, ReservationModule, UserModule ],
  providers: [FlatTypeService],
  exports: [FlatTypeService],
  controllers: [FlatTypeController]
})
export class FlatTypeModule {}
