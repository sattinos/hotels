import { BaseEntity } from './baseEntity';
import { ReservationEntity, getDefaultReservation } from './reservationEntity';
import { FlatEntity, getDefaultFlat } from './flatEntity';
import { FlatTypeEntity } from './flatType';

export interface ReservedFlatEntity extends BaseEntity {
    reservation: ReservationEntity;
    flat: FlatEntity;
    from: Date;
    to: Date;
    flatType?: FlatTypeEntity;
}

export const getDefaultReservedFlat = (): ReservedFlatEntity => {
    return {
        createdAt: new Date(),
        updatedAt: new Date(),
        reservation: getDefaultReservation(),
        flat: getDefaultFlat(),
        from: new Date(),
        to: new Date()
    };
};
