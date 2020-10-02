import { Injectable, Logger } from '@nestjs/common';
import { CrudServiceOrm } from '../lib/crud/crud-service';
import { ReservationLogEntity, UserAction } from './reservation-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '../reservation/reservation.entity';
import { ReservationService } from '../reservation/reservation.service';

@Injectable()
export class ReservationLogService extends CrudServiceOrm<ReservationLogEntity> {
    constructor(
        @InjectRepository(ReservationLogEntity)
        protected readonly rep: Repository<ReservationLogEntity>,
        protected readonly reservationService: ReservationService
    ) {
        super(rep);
        this.reservationService.emitter.on('create', this.onCreate);
        this.reservationService.emitter.on('delete', this.onReservationDeleted);
        this.reservationService.emitter.on('deleteMany', this.onReservationsDeleted);
        this.reservationService.emitter.on('update', this.onUpdate);
        this.reservationService.emitter.on('updateMany', this.onUpdateMany);
    }

    public async createFrom(reservationEntity: ReservationEntity,
                            action: UserAction): Promise<ReservationLogEntity> {
        try {
            const entity = this.getLogEntity(reservationEntity, action);
            return await this.rep.save(entity);
        } catch (err) {
            Logger.error(`createFrom(err):`);
            Logger.error(err);
        }
    }

    private getLogEntity = (reservationEntity: ReservationEntity, action: UserAction): ReservationLogEntity => {
        const entity = new ReservationLogEntity();
        entity.channel = reservationEntity.channel;
        entity.from = reservationEntity.from;
        entity.to = reservationEntity.to;
        entity.status = reservationEntity.status;

        entity.reservationCreatedAt = reservationEntity.createdAt;
        entity.reservationUpdatedAt = reservationEntity.updatedAt;

        entity.action = action;

        entity.reservedFlatsIDs = [];
        for (let index = 0; index < reservationEntity.reservedFlats.length; index++) {
            entity.reservedFlatsIDs.push(reservationEntity.reservedFlats[index].id.toString());
        }
        entity.reserversIDs = [];
        for (let index = 0; index < reservationEntity.reservers.length; index++) {
            entity.reserversIDs.push(reservationEntity.reservers[index].id.toString());
        }
        delete (entity as any).flats;
        delete (entity as any).reservers;
        return entity;
    }

    private getLogEntities = (reservations: ReservationEntity[], action: UserAction) => {
        const logs: ReservationLogEntity[] = [];
        for (let index = 0; index < reservations.length; index++) {
            logs.push(this.getLogEntity(reservations[index], action));
        }
        return logs;
    }

    private onReservationsDeleted = (reservations: ReservationEntity[]) => {
        const logs: ReservationLogEntity[] = this.getLogEntities(reservations, UserAction.DeleteMany);
        this.rep.save(logs as any);
    }

    private onReservationDeleted = (reservation: ReservationEntity) => {
        const log: ReservationLogEntity = this.getLogEntity(reservation, UserAction.DeleteOne);
        this.rep.save(log as any);
    }

    private onCreate = (reservation: ReservationEntity) => {
        this.createFrom(reservation, UserAction.InsertOne);
    }

    private onUpdate = (reservation: ReservationEntity) => {
        this.createFrom(reservation, UserAction.UpdateOne);
    }

    private onUpdateMany = (reservations: ReservationEntity[]) => {
        const logs: ReservationLogEntity[] = this.getLogEntities(reservations, UserAction.UpdateMany);
        this.rep.save(logs as any);
    }
}
