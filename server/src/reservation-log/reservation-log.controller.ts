import { Controller } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { ReservationLogEntity } from './reservation-log.entity';
import { ReservationLogService } from './reservation-log.service';

@Controller('reservation-log')
export class ReservationLogController extends CrudController<ReservationLogEntity> {
    constructor(protected readonly service: ReservationLogService) {
        super(service);
    }
}
