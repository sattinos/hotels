import { BaseEntity } from './baseEntity';
import { ReservationStatus } from './reservationEntity';

export enum UserAction {
    InsertOne,
    InsertMany,
    UpdateOne,
    UpdateMany,
    DeleteOne,
    DeleteMany
}

export interface ReservationLogEntity extends BaseEntity {
    reservationCreatedAt: Date;
    reservationUpdatedAt: Date;
    flatsIDs: string[];
    status: ReservationStatus;
    reserversIDs: string[];
    from: Date;
    to: Date;
    channel: string;
    action: UserAction;
}
