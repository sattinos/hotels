import { Injectable } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { PromoCodeEntity } from './promo-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PromoCodeService  extends CrudServiceOrm<PromoCodeEntity> {
    constructor(
        @InjectRepository(PromoCodeEntity)
        protected readonly rep: Repository<PromoCodeEntity>
      ) {
        super(rep);
      }
}
