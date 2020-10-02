export type validator = (v: any) => boolean;

export const isDefined = (v: any): boolean => {
    return !!v;
};

export const isStringValid = (v: string): boolean => {
    return !!v && v.length > 0;
};

export const isArrayValid = (arr: any[]): boolean => {
    return !!arr && arr.length > 0;
};

export const isStringArrayValid = (arr: string[]): boolean => {
    if (!isArrayValid(arr)) {
        return false;
    }
    for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        if (!isStringValid(item)) {
            return false;
        }
    }
    return true;
};

export const isNumeric = (value: any): boolean => {
    return !isNaN(value - parseFloat(value));
}

export const validators: validator[] = [
    isDefined,
    isStringValid,
    isArrayValid,
    isStringArrayValid,
    isNumeric
];