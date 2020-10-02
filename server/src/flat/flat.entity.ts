import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { FlatTypeEntity } from '../flat-type/flat-type.entity';
import { BaseEntity } from '../base/base.entity';
import { ReservedFlatEntity } from '../reserved-flat/reserved-flat.entity';

@Entity()
export class FlatEntity extends BaseEntity {
  @ManyToOne(_type => FlatTypeEntity, flatType => flatType.flats)
  type: FlatTypeEntity;

  @OneToMany(_type => ReservedFlatEntity, reservedFlat => reservedFlat.flat)
  reservedFlats: ReservedFlatEntity[];
}
