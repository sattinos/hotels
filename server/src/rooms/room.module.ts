import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService]
})
export class RoomModule {}
