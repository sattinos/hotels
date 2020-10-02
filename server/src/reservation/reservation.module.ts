import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './reservation.entity';
import { UserModule } from '../user/user.module';
import { ReservedFlatModule } from '../reserved-flat/reserved-flat.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ReservationEntity]), ReservedFlatModule, UserModule],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService]
})
export class ReservationModule {}
