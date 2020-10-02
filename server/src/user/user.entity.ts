import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { MenuItemEntity } from '../menu-item/menu-item.entity';

export enum UserType {
  superAdmin,
  admin,
  customer
}

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ length: 60 })
  fullName: string;

  @Column({ length: 30, unique: true, nullable: false })
  userName: string;

  @Column({ length: 50, nullable: false })
  password: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ length: 50, unique: true, nullable: false })
  phone: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: UserType.admin })
  userType: number;

  @ManyToMany(type => MenuItemEntity)
  @JoinTable()
  menus: MenuItemEntity[];

  @Column({ nullable: true })
  city: string;
}
