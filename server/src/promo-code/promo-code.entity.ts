import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PromoCodeEntity extends BaseEntity {
    @Column({
        unique: true,
        nullable: false
    })
    name: string;

    @Column()
    percent: number;

    @Column()
    value: string;

    @Column()
    validFrom: Date;

    @Column()
    validTo: Date;
}
