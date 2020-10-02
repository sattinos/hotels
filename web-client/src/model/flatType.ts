import { BaseEntity } from './baseEntity';
import { RoomEntity } from './roomEntity';
import { FlatEntity } from './flatEntity';

export interface FlatTypeEntity extends BaseEntity {
    name: string;
    description: string;
    count: number;
    price: number;
    images: string[];
    area: number;
    type: string;
    bedRooms: RoomEntity[];
    livingRooms: RoomEntity[];
    bathRooms: RoomEntity[];
    kitchens: RoomEntity[];
    flats: FlatEntity[];
}

export const getDefaultFlatType = (): FlatTypeEntity => {
    return {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: '',
        description: '',
        count: 0,
        price: 0,
        images: [],
        area: 0,
        type: '',
        bedRooms: [],
        livingRooms: [],
        bathRooms: [],
        kitchens: [],
        flats: []
    };
};