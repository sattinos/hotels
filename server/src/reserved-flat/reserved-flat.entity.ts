import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { FlatEntity } from '../flat/flat.entity';
import { ReservationEntity } from '../reservation/reservation.entity';
import { BaseEntity } from '../base/base.entity';
import { FlatTypeEntity } from '../flat-type/flat-type.entity';

@Entity()
@Index(['flat', 'from'], { unique: true })
export class ReservedFlatEntity extends BaseEntity {
    @ManyToOne(_type => ReservationEntity, reservation => reservation.reservedFlats)
    reservation: ReservationEntity;

    @ManyToOne(_type => FlatEntity, flat => flat.reservedFlats, { eager: true })
    flat: FlatEntity;

    @ManyToOne(_type => FlatTypeEntity, flatType => flatType.reservedFlats)
    flatType: FlatTypeEntity;

    @Column({ type: 'timestamp without time zone'})
    from: Date;

    @Column({ type: 'timestamp without time zone'})
    to: Date;
}
