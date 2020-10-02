import { Controller } from '@nestjs/common';
import { CrudController } from '../lib/crud/crud-controller';
import { PromoCodeEntity } from './promo-code.entity';
import { PromoCodeService } from './promo-code.service';

@Controller('promo-code')
export class PromoCodeController extends CrudController<PromoCodeEntity> {
    constructor(protected readonly service: PromoCodeService) {
        super(service);
    }
}
