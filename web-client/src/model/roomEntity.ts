export enum RoomType {
    BedRoom,
    LivingRoom,
    BathRoom,
    Kitchen
}

export const roomTypes: string[] = [
    'Bed Room',
    'Living Room',
    'Bath Room',
    'Kitchen Room'
];

export interface RoomEntity {
    id?: number;
    name: string;
    bedsIDs: number[];
    description: string;
    type: RoomType;
}

export const getDefaultRoom = (): RoomEntity => {
    return {
        name: '',
        bedsIDs: [],
        description: '',
        type: RoomType.BedRoom
    };
};
