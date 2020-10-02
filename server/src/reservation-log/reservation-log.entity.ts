import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ReservationStatus } from '../reservation/reservation.entity';

export enum UserAction {
    InsertOne,
    InsertMany,
    UpdateOne,
    UpdateMany,
    DeleteOne,
    DeleteMany
}

@Entity()
export class ReservationLogEntity extends BaseEntity {
    @Column()
    reservationCreatedAt: Date;

    @Column()
    reservationUpdatedAt: Date;

    @Column('simple-array')
    reservedFlatsIDs: string[];

    @Column({
        type: 'enum',
        enum: ReservationStatus
    })
    status: ReservationStatus;

    @Column('simple-array')
    reserversIDs: string[];

    @Column()
    from: Date;

    @Column()
    to: Date;

    @Column()
    channel: string;

    @Column({
        type: 'enum',
        enum: UserAction
    })
    action: UserAction;
}
