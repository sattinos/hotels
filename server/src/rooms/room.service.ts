import { Injectable } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService extends CrudServiceOrm<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    protected readonly rep: Repository<RoomEntity>
  ) {
    super(rep);
  }
}
