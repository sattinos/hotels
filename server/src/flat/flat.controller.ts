import { Controller } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { FlatEntity } from './flat.entity';
import { FlatService } from './flat.service';

@Controller('flats')
export class FlatController extends CrudController<FlatEntity>{
    constructor(protected readonly service: FlatService) {
        super(service);
    }
}
