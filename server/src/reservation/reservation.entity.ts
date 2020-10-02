import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { UserEntity } from '../user/user.entity';
import { ReservedFlatEntity } from '../reserved-flat/reserved-flat.entity';

export enum ReservationStatus {
    New,
    InReview,
    Confirmed,
    Cancelled
}

export interface DesiredReservationChunk {
    countToReserve: number;
    flatType: string;
}

@Entity()
export class ReservationEntity extends BaseEntity {
    @OneToMany(_type => ReservedFlatEntity, reservedFlat => reservedFlat.reservation)
    reservedFlats: ReservedFlatEntity[];

    @Column({
        type: 'enum',
        enum: ReservationStatus
    })
    status: ReservationStatus;

    @ManyToMany(_type => UserEntity, { eager: true })
    @JoinTable()
    reservers: UserEntity[];

    @Column({ type: 'timestamp without time zone'})
    from: Date;

    @Column({ type: 'timestamp without time zone'})
    to: Date;

    @Column()
    channel: string;
}
