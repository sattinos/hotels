import { Injectable, Logger } from '@nestjs/common';
import { CrudServiceOrm, RelationInfo } from '../lib/crud/crud-service';
import { FlatTypeEntity, CustomerReserveResponse } from './flat-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomService } from '../rooms/room.service';
import { FlatService } from '../flat/flat.service';
import { RoomEntity } from '../rooms/room.entity';
import { ReservedFlatService } from '../reserved-flat/reserved-flat.service';
import { ReservationService } from '../reservation/reservation.service';
import { ReservationEntity, ReservationStatus, DesiredReservationChunk } from '../reservation/reservation.entity';
import { UserService } from '../user/user.service';
import { ReservedFlatEntity } from '../reserved-flat/reserved-flat.entity';
import appLogger from '../logger';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class FlatTypeService extends CrudServiceOrm<FlatTypeEntity> {
    constructor(
        @InjectRepository(FlatTypeEntity)
        protected readonly rep: Repository<FlatTypeEntity>,
        public readonly roomService: RoomService,
        public readonly flatService: FlatService,
        public readonly reservedFlatService: ReservedFlatService,
        public readonly reservationService: ReservationService,
        public readonly userService: UserService
    ) {
        super(rep);
    }

    public async create(flatType: FlatTypeEntity, relations?: RelationInfo[]): Promise<FlatTypeEntity> {
        await this.fetchFlatTypeRooms(flatType, relations);
        const createRes = await super.create(flatType);
        const flats = await this.flatService.instantiate(flatType.count, flatType);
        await this.flatService.saveInstances(flats);
        return createRes;
    }

    public async customerReserve(from: Date, to: Date, desiredChunks: DesiredReservationChunk[], channel: string, fullName: string, phone: string, city: string): Promise<CustomerReserveResponse> {
        let reservation = null;
        let customerID = null;
        try {
            appLogger.winstonLogger.info('customerReserve service start');
            let customer = await this.userService.repositery.findOne({
                where: {
                    phone
                }
            });
            if (!customer) {
                customer = await this.userService.guestCreate(fullName, phone, city);
            } else {
                Logger.log('old customer:');
                Logger.log(customer);
            }
            customerID = customer.id;
            reservation = await this.reserve(from, to, desiredChunks, channel, [customer]);
            let isOtpSent = false;
            if (reservation) {
                const otpResponse = await this.userService.generateOtp(phone);
                isOtpSent = otpResponse.isSuccess;
            } else {
                await this.userService.delete(customer.id);
                customerID = null;
            }
            appLogger.winstonLogger.info('customerReserve service end');
            const response = {
                reserverID: customerID,
                isOtpSent,
                reservation,
                isSuccess: true
            };
            appLogger.winstonLogger.info(JSON.stringify(response));
            return response;
        } catch (error) {
            appLogger.winstonLogger.error('customerReserve(err):');
            appLogger.winstonLogger.error(JSON.stringify(error));
            if (reservation) {
                // TODO: we need to rollback here
            }
            return {
                isSuccess: false
            };
        }
    }

    public async update(id: any, newInstance: FlatTypeEntity, relations?: RelationInfo[]): Promise<FlatTypeEntity> {
        const oldInstance = await this.getOne(id);
        let oldFlats = await this.flatService.getFlats(oldInstance);
        if (oldInstance.count <= newInstance.count) {
            await this.fetchFlatTypeRooms(newInstance, relations);
            if (oldInstance.count < newInstance.count) {
                const newFlats = await this.flatService.instantiate(newInstance.count - oldInstance.count, newInstance);
                await this.flatService.saveInstances(newFlats);
                oldFlats = oldFlats.concat(newFlats);
                newInstance.flats = oldFlats;
            }
            return await super.update(id, newInstance);
        }
        throw new Error(`Can't shrink flats.`);
    }

    async delete(id: any): Promise<FlatTypeEntity> {
        const foundEntity = await this.getOne(id);
        await this.flatService.repositery.delete({
            type: foundEntity
        });
        return await super.delete(id);
    }

    async reserve(from: Date, to: Date, desiredChunks: DesiredReservationChunk[], channel: string, reservers: UserEntity[]): Promise<ReservationEntity> {
        const reservedFlats: ReservedFlatEntity[] = [];
        let cantReserve = false;

        for (let desiredChunkIndex = 0; desiredChunkIndex < desiredChunks.length; desiredChunkIndex++) {
            const desiredChunk = desiredChunks[desiredChunkIndex];
            const flatType = await this.getFlatType(desiredChunk.flatType);
            // Logger.log(flatType, 'flatType:');
            const reservedFlatsIDsForChunk = await this.reservedFlatService.getReservedFlatsIDs(from, flatType, to);
            const availableFlatsCount = await this.getAvailableFlatsCount(from, flatType.type, to, reservedFlatsIDsForChunk);
            if (availableFlatsCount >= desiredChunk.countToReserve) {
                const flatsToBook = await this.flatService.getNFlats(desiredChunk.countToReserve, flatType, reservedFlatsIDsForChunk);
                // Logger.log(flatsToBook, 'flatsToBook:');

                const reservedFlatsForChunk: ReservedFlatEntity[] = await this.reservedFlatService.instantiate(from, to, flatsToBook, flatType);
                // Logger.log(reservedFlats, 'reservedFlatsForChunk:');
                reservedFlats.push(...reservedFlatsForChunk);
            } else {
                cantReserve = true;
                break;
            }
        }
        if (cantReserve && (reservedFlats.length > 0)) {
            await this.dereserve(reservedFlats);
            return;
        }
        try {
            const reservation = new ReservationEntity();
            reservation.from = from;
            reservation.to = to;
            reservation.channel = channel;
            reservation.reservers = reservers;
            reservation.status = ReservationStatus.New;
            reservation.reservedFlats = reservedFlats;
            const savedReservation = await this.reservationService.repositery.save(reservation);
            // Logger.log(savedReservation, 'reservation:');
            this.reservationService.emitter.emit('create', reservation);
            return savedReservation;
        } catch (error) {
            appLogger.winstonLogger.error('reserve(err):');
            appLogger.winstonLogger.error(JSON.stringify(error, null, 4));
            await this.dereserve(reservedFlats);
            return null;
        }
    }

    async dereserve(reservedFlats: ReservedFlatEntity[]) {
        const ids = [];
        for (let index = 0; index < reservedFlats.length; index++) {
            ids.push(reservedFlats[index].id);
        }
        if (ids.length > 0) {
            return await this.reservedFlatService.deleteMany(ids);
        }
    }

    async modify(reservationID: number, from: Date, to: Date, count: number, type: string, reserverID: number): Promise<ReservationEntity> {
        const oldReservation = await this.reservationService.repositery.findOne({
            where: { id: reservationID },
            relations: ['reservedFlats', 'reservers']
        });

        const flatType = await this.getFlatType(type);
        // Logger.log(flatType, 'flatType:');
        const reservedFlatsIDs = await this.reservedFlatService.getReservedFlatsIDs(from, flatType, to);
        const availableFlatsCount = await this.getAvailableFlatsCount(from, flatType.type, to, reservedFlatsIDs);
        if (availableFlatsCount >= count) {
            const flatsToBook = await this.flatService.getNFlats(count, flatType, reservedFlatsIDs);
            // Logger.log(flatsToBook, 'flatsToBook:');

            const reservedFlats = await this.reservedFlatService.instantiate(from, to, flatsToBook, flatType);
            // Logger.log(reservedFlats, 'reservedFlats:');

            const reserver = await this.userService.getOne(reserverID);
            // Logger.log(reserver, 'reserver:');

            const reservation = new ReservationEntity();
            reservation.from = from;
            reservation.to = to;
            reservation.channel = 'internet';
            reservation.reservers = [reserver];
            reservation.status = ReservationStatus.New;
            reservation.reservedFlats = reservedFlats;
            const savedReservation = await this.reservationService.repositery.save(reservation);
            // Logger.log(savedReservation, 'reservation:');
            this.reservationService.emitter.emit('create', reservation);
            return savedReservation;
        }
        throw new Error('not enough flats.');
    }

    public getFlatsTypes = async () => {
        try {
            const flatTypes = await this.rep.find({
                select: ['type']
            });
            const result: string[] = [];
            for (let index = 0; index < flatTypes.length; index++) {
                result.push(flatTypes[index].type);
            }
            return result;
        } catch (error) {
            Logger.error(error.message, 'getFlatsTypes(err)');
            return [];
        }
    }

    public getTotalFlats = async (type: string) => {
        try {
            const flatType = await this.rep.findOne({
                where: {
                    type
                }
            });
            return flatType.count;
        } catch (error) {
            Logger.error(error.message, 'getTotalFlats(err):');
            return -1;
        }
    }

    public getFlatType = async (type: string) => {
        const flatType = await this.rep.findOne({
            where: {
                type
            }
        });
        return flatType;
    }

    public getAvailableFlats = async (forDate: Date, flatTypeStr: string, toDate: Date, reservedFlatsIDs?: number[]) => {
        Logger.log('getAvailableFlats');
        const flatType = await this.getFlatType(flatTypeStr);
        if (!reservedFlatsIDs) {
            reservedFlatsIDs = await this.reservedFlatService.getReservedFlatsIDs(forDate, flatType, toDate);
        }
        const notReservedFlats = await this.flatService.getFlats(flatType, reservedFlatsIDs);
        return notReservedFlats;
    }

    public getAvailableFlatsCount = async (forDate: Date, flatTypeStr: string, toDate?: Date, reservedFlatsIDs?: number[]) => {
        const flatType = await this.getFlatType(flatTypeStr);
        if (!reservedFlatsIDs) {
            reservedFlatsIDs = await this.reservedFlatService.getReservedFlatsIDs(forDate, flatType, toDate);
        }
        const notReservedFlatsCount = await this.flatService.getFlatsCount(flatType, reservedFlatsIDs);
        return notReservedFlatsCount;
    }

    private async fetchFlatTypeRooms(flatType: FlatTypeEntity, relations: RelationInfo[]) {
        flatType.bedRooms = await this.fetchRooms(relations, 'bedRooms');
        flatType.livingRooms = await this.fetchRooms(relations, 'livingRooms');
        flatType.bathRooms = await this.fetchRooms(relations, 'bathRooms');
        flatType.kitchens = await this.fetchRooms(relations, 'kitchens');
    }

    private async fetchRooms(relations: RelationInfo[], key: string) {
        if (relations && relations.length > 0) {
            for (let relationIndex = 0; relationIndex < relations.length; relationIndex++) {
                const relation = relations[relationIndex];
                if (relation.fieldName === key) {
                    const rooms: RoomEntity[] = [];
                    for (let idIndex = 0; idIndex < relation.ids.length; idIndex++) {
                        const id = relation.ids[idIndex];
                        const bedRoom: RoomEntity = await this.roomService.getOne(id);
                        rooms.push(bedRoom);
                    }
                    return rooms;
                }
            }
        }
        return [];
    }
}
