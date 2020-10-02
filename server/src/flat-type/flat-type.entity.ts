import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { FlatEntity } from '../flat/flat.entity';
import { RoomEntity } from '../rooms/room.entity';
import { ReservedFlatEntity } from '../reserved-flat/reserved-flat.entity';
import { ReservationEntity } from '../reservation/reservation.entity';

/*
export enum FlatType {
  Small,
  Normal,
  Big,
  Delux
}
*/
@Entity()
export class FlatTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  count: number;

  @Column()
  price: number;

  @Column({
    unique: true
  })
  type: string;

  @Column('simple-array')
  images: string[];

  @Column()
  area: number;

  @ManyToMany(_type => RoomEntity, { eager: true })
  @JoinTable()
  bedRooms: RoomEntity[];

  @ManyToMany(_type => RoomEntity, { eager: true })
  @JoinTable()
  livingRooms: RoomEntity[];

  @ManyToMany(_type => RoomEntity, { eager: true })
  @JoinTable()
  bathRooms: RoomEntity[];

  @ManyToMany(_type => RoomEntity, { eager: true })
  @JoinTable()
  kitchens: RoomEntity[];

  @OneToMany(_type => FlatEntity, flat => flat.type)
  flats: FlatEntity[];

  @OneToMany(_type => ReservedFlatEntity, reservedFlat => reservedFlat.flatType)
  reservedFlats: ReservedFlatEntity[];
}

export interface CustomerReserveResponse {
  reserverID?: number;
  reservation?: ReservationEntity;
  isOtpSent?: boolean;
  isSuccess: boolean;
}
