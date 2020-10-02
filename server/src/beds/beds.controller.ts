import { Controller } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { BedEntity } from './bed.entity';
import { BedsService } from './beds.service';

@Controller('beds')
export class BedsController extends CrudController<BedEntity> {
    constructor(protected readonly service: BedsService) {
        super(service);
    }
}
