import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class MenuItemEntity extends BaseEntity {
    @Index()
    @Column({ length: 50, nullable: false, unique: true })
    uID: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true})
    to: string;

    @Column({ nullable: true})
    className: string;

    @Column({ nullable: true})
    parentuID: string;

    @Column({ nullable: true})
    entity: number;

    @Column({ nullable: true})
    createPath?: string;

    @Column({ nullable: true})
    updatePath?: string;

    @Column({ nullable: true})
    deletePath?: string;
}
