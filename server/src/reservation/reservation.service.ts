import { Injectable } from '@nestjs/common';
import { CrudServiceOrm, RelationInfo } from '../lib/crud/crud-service';
import { ReservationEntity } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserService } from '../user/user.service';
import { EventEmitter } from 'events';
import { ReservedFlatService } from '../reserved-flat/reserved-flat.service';

@Injectable()
export class ReservationService extends CrudServiceOrm<ReservationEntity> {
    private _emitter = new EventEmitter();

    constructor(
        @InjectRepository(ReservationEntity)
        protected readonly rep: Repository<ReservationEntity>,
        public readonly reservedFlatService: ReservedFlatService,
        public readonly userService: UserService
    ) {
        super(rep);
    }

    public get emitter() {
        return this._emitter;
    }

    async create(entity: ReservationEntity, relations?: RelationInfo[]): Promise<ReservationEntity> {
        entity = await this.fillEntityRelations(entity, relations);
        const created = await super.create(entity);
        if (created) {
            this._emitter.emit('create', entity);
        }
        return created;
    }

    async update(id: any, entity: ReservationEntity, relations?: RelationInfo[]): Promise<ReservationEntity> {
        entity = await this.fillEntityRelations(entity, relations);
        const updated = await super.update(id, entity);
        if ( updated ) {
            this._emitter.emit('update', updated);
        }
        return updated;
    }

    async delete(id: any): Promise<ReservationEntity> {
        const entity = await this.repositery.findOne({
            relations: ['reservedFlats'],
            where: {
                id
            }
        });
        if ( entity ) {
            const reservedFlatsIDs = [];
            for (let index = 0; index < entity.reservedFlats.length; index++) {
                reservedFlatsIDs.push(entity.reservedFlats[index].id);
            }
            await this.reservedFlatService.deleteMany(reservedFlatsIDs);
        }
        await super.delete(id);
        this._emitter.emit('delete', entity);
        return entity;
    }

    async deleteMany(ids: any[]): Promise<boolean> {
        const entities = await this.rep.find({
            where: {
                id: In(ids)
            }
        });
        const isDeleted = await super.deleteMany(ids);
        if (isDeleted) {
            this._emitter.emit('deleteMany', entities);
        }
        return isDeleted;
    }

    async fillEntityRelations(entity: ReservationEntity, relations?: RelationInfo[]): Promise<ReservationEntity> {
        const reservedFlatRelation = this.getRelation(relations, 'reservedFlats');
        entity.reservedFlats = await this.fetch(this.reservedFlatService, reservedFlatRelation);

        const reserverRelation = this.getRelation(relations, 'reservers');
        entity.reservers = await this.fetch(this.userService, reserverRelation);
        return entity;
    }

    async fetch<G>(service: CrudServiceOrm<G>, relation: RelationInfo): Promise<G[]> {
        const entities: G[] = [];
        for (let idIndex = 0; idIndex < relation.ids.length; idIndex++) {
            const id = relation.ids[idIndex];
            const entity = await service.getOne(id);
            entities.push(entity);
        }
        return entities;
    }

    getRelation(relations: RelationInfo[], key: string) {
        for (let index = 0; index < relations.length; index++) {
            if (relations[index].fieldName === key) {
                return relations[index];
            }
        }
        return null;
    }
}
