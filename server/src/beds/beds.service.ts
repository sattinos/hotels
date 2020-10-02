import { Injectable } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { BedEntity } from './bed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BedsService extends CrudServiceOrm<BedEntity> {
    constructor(
        @InjectRepository(BedEntity)
        protected readonly rep: Repository<BedEntity>,
      ) {
        super(rep);
      }

}
