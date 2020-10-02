import { Controller, Get } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController extends CrudController<RoomEntity> {
    constructor(protected readonly service: RoomService) {
        super(service);
    }
}
