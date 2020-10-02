import { Injectable, Logger } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { ReservedFlatEntity } from './reserved-flat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, FindConditions, LessThanOrEqual, LessThan, MoreThan, Raw, Equal } from 'typeorm';
import { FlatTypeEntity } from '../flat-type/flat-type.entity';
import { FlatEntity } from '../flat/flat.entity';

@Injectable()
export class ReservedFlatService extends CrudServiceOrm<ReservedFlatEntity> {
    constructor(
        @InjectRepository(ReservedFlatEntity)
        public readonly rep: Repository<ReservedFlatEntity>
    ) {
        super(rep);
    }

    async instantiate(from: Date, to: Date, flats: FlatEntity[], flatType: FlatTypeEntity): Promise<ReservedFlatEntity[]> {
        const instances: ReservedFlatEntity[] = [];
        for (let index = 0; index < flats.length; index++) {
            const flat = flats[index];
            const instance = new ReservedFlatEntity();
            instance.flat = flat;
            instance.from = from;
            instance.to = to;
            // tslint:disable-next-line:no-console
            console.log('flatType:', flatType);
            instance.flatType = flatType;
            instances.push(instance);
        }
        return await this.rep.save(instances);
    }

    countReservedFlats = async (fromDate: Date,
                                flatType: FlatTypeEntity,
                                toDate?: Date): Promise<number> => {
        const where: any = {
            flatType,
            from: MoreThanOrEqual(fromDate)
        };
        if (toDate) {
            where.to = LessThanOrEqual(toDate);
        }

        const reservedFlatCount = await this.rep.count({
            where
        });
        Logger.log('reserved flat count:');
        Logger.log(reservedFlatCount);
        return reservedFlatCount;
    }

    getReservedFlats = async (fromDate: Date,
                              flatType: FlatTypeEntity,
                              toDate?: Date): Promise<ReservedFlatEntity[]> => {
        const where: any = {
            flatType,
            from: MoreThanOrEqual(fromDate)
        };
        if (toDate) {
            where.to = LessThanOrEqual(toDate);
        }
        const reservedFlats = await this.rep.find({
            where
        });
        return reservedFlats;
    }

    getReservedFlatsIDs = async (fromDate: Date, flatType: FlatTypeEntity, toDate?: Date): Promise<number[]> => {
        const where: any = {
            flatType,
            from: MoreThanOrEqual(fromDate)
        };
        if (toDate) {
            where.to = LessThanOrEqual(toDate);
        }
        const reservedFlats = await this.rep.find({
            where
        });
        // Logger.log(reservedFlats, 'reservedFlats');
        const ids: number[] = [];
        for (let index = 0; index < reservedFlats.length; index++) {
            ids.push(reservedFlats[index].flat.id);
        }
        return ids;
    }

    getReservedFlatsFor = async (specificDate: Date, flatType: FlatTypeEntity): Promise<ReservedFlatEntity[]> => {
        Logger.log('----------------');
        Logger.log(specificDate);
        Logger.log('----------------');

        const start = new Date(specificDate);
        const end = new Date(start); end.setDate(start.getDate() + 1); end.setUTCHours(10, 59, 59, 999);
        Logger.log('----------------');
        Logger.log(start, 'start');
        Logger.log(end, 'end');
        Logger.log('----------------\n\n');

        const reservedFlats = await this.rep.find({
            where: {
                flatType, from: MoreThanOrEqual(start), to: LessThanOrEqual(end)
            }
        });
        if (reservedFlats.length > 0) {
            Logger.log('------ Found ----------');
            Logger.log(specificDate);
            Logger.log(reservedFlats[0].from);
            Logger.log(reservedFlats[0].to);
            Logger.log('----------------');
        }
        return reservedFlats;
    }
}
