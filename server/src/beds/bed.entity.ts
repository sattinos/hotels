import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

enum BedType {
    Single = 0,
    Double,
    KingSize
}

@Entity()
export class BedEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('simple-array')
  filenames: string[];

  @Column({
      type: 'int',
      nullable: false
  })
  type: BedType;

  @Column()
  description: string;
}
