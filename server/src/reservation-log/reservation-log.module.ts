import { Module } from '@nestjs/common';
import { ReservationLogService } from './reservation-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationLogEntity } from './reservation-log.entity';
import { ReservationModule } from '../reservation/reservation.module';
import { ReservationLogController } from './reservation-log.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([ReservationLogEntity]), ReservationModule],
  providers: [ReservationLogService],
  controllers: [ReservationLogController]
})
export class ReservationLogModule {}
