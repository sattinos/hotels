import { BaseEntity } from './baseEntity';
import { UserProfile } from './userProfile';
import { ReservedFlatEntity } from './reservedFlatEntity';

export enum ReservationStatus {
    New,
    InReview,
    Confirmed,
    Cancelled
}

export const reservationStatusString: string[] = [
    'New',
    'InReview',
    'Confirmed',
    'Cancelled'
];

export interface DesiredReservationChunk {
    countToReserve: number;
    flatType: string;
}

export interface ReservationEntity extends BaseEntity {
    reservedFlats: ReservedFlatEntity[];
    reservers: UserProfile[];
    status: ReservationStatus;
    from: Date;
    to: Date;
    channel: string;
}

export const getDefaultReservation = (): ReservationEntity => {
    const from = new Date();
    from.setUTCHours(11, 0, 0, 0);

    const to = new Date();
    to.setDate( to.getDate() + 1);
    to.setUTCHours(10, 59, 59, 999);

    return {
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        reservedFlats: [],
        reservers: [],
        status: ReservationStatus.New,
        from,
        to,
        channel: ''
    };
};