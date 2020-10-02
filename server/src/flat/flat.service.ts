import { RoomService } from '../rooms/room.service';
import { FlatEntity } from './flat.entity';
import { Injectable } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, FindConditions, FindManyOptions } from 'typeorm';
import { FlatTypeEntity } from '../flat-type/flat-type.entity';
import { isArrayValid } from '../lib/helpers/validators';

@Injectable()
export class FlatService extends CrudServiceOrm<FlatEntity> {
    constructor(
        @InjectRepository(FlatEntity)
        protected readonly rep: Repository<FlatEntity>,
        public readonly roomService: RoomService
    ) {
        super(rep);
    }

    async instantiate(count: number, flatType: FlatTypeEntity) {
        const instances: FlatEntity[] = [];
        for (let index = 0; index < count; index++) {
            const instance = new FlatEntity();
            instance.type = flatType;
            instance.reservedFlats = [];
            instances.push(instance);
        }
        return instances;
    }

    async saveInstances(instances: FlatEntity[]) {
        for (let index = 0; index < instances.length; index++) {
            await this.create(instances[index]);
        }
        return instances;
    }

    async getFlats(flatType: FlatTypeEntity, excludeList?: number[]) {
        const where: FindConditions<FlatEntity> = {
            type: flatType
        };
        if (isArrayValid(excludeList)) {
            where.id = Not(In(excludeList));
        }
        const flats = await this.rep.find({
            where
        });
        return flats;
    }

    async getFlatsCount(flatType: FlatTypeEntity, excludeList?: number[]) {
        const where: FindConditions<FlatEntity> = {
            type: flatType
        };
        if (isArrayValid(excludeList)) {
            where.id = Not(In(excludeList));
        }
        const count = await this.rep.count({
            where
        });
        return count;
    }

    async getNFlats(count: number, flatType: FlatTypeEntity, excludeList?: number[]): Promise<FlatEntity[]> {
        const where: any = {
            type: flatType
        };
        if (isArrayValid(excludeList)) {
            where.id = Not(In(excludeList));
        }
        return await this.rep.find({
            where,
            take: count
        });
    }
}
