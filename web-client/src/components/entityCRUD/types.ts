export interface Indexable {
    [key: string]: any;
}

export enum FieldTypes {
    label,
    inputText,
    inputDigit,
    inputDate,
    inputArea,
    inputFile,
    options,
    button,
    custom,
    verticalSpacer
}

export interface MetaData {
    id?: string;
    label?: string;
    readOnly?: boolean;
    className?: string;
    name?: string;
    value?: string | number;
    type: FieldTypes;
    placeholder?: string;
    title?: string;
    options?: string[];
    isValid?: (v: any) => boolean;
}

export interface MetaDataForFiles {
    fieldName: string;
    files: File[];
}