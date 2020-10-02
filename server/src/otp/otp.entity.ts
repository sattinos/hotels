import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class OtpEntity extends BaseEntity {
    @Column({ unique: true })
    @Index({ unique: true })
    generated: string;

    @Column()
    @Index({ unique: true })
    msisdn: string;
}
