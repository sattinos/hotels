import { Controller, Get, Query } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { ReservedFlatEntity } from './reserved-flat.entity';
import { ReservedFlatService } from './reserved-flat.service';

@Controller('reserved-flat')
export class ReservedFlatController extends CrudController<ReservedFlatEntity> {
    constructor(protected readonly service: ReservedFlatService) {
        super(service);
    }
}
