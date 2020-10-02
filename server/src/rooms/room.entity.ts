import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum RoomType {
  BedRoom,
  LivingRoom,
  BathRoom,
  Kitchen
}

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: RoomType;

  @Column('simple-array')
  bedsIDs: string[];

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
