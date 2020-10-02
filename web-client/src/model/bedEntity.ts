export enum BedType {
    Single = 0,
    Double,
    KingSize
}

const bedTypes: string[] = [
    'Single Bed',
    'Double Bed',
    'KingSize Bed'
];

export interface BedEntity {
    id?: number;
    name: string;
    filenames: string[];
    type: BedType;
    description: string;
}

const getDefaultBed = (): BedEntity => {
    return {
        name: '',
        filenames: [],
        type: BedType.Single,
        description: ''
    };
};

export { bedTypes, getDefaultBed };