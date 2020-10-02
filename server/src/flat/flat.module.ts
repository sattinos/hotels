import { RoomModule } from '../rooms/room.module';
import { FlatController } from './flat.controller';
import { FlatService } from './flat.service';
import { FlatEntity } from './flat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([FlatEntity]), RoomModule],
  providers: [FlatService],
  controllers: [FlatController],
  exports: [FlatService]
})
export class FlatModule {}
