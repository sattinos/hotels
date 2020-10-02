export interface FilterItem {
    id: any;
    value: any;
}

export interface Filter {
    [key: string]: string;
}

export const digitEqualityFilter = (value: number) => {
    return `$eq:${value}`;
};

export const stringEqualityFilter = (value: string) => {
    return `$seq:${value}`;
};

export const nearlyStringEqualFilter = (value: string) => {
    return `$regex:${value}`;
};

export interface SortItem {
    id: string;
    desc: boolean;
}