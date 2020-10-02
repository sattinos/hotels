export const toStringArray = (numbers: number[]) => {
    const os: string[] = [];
    for (let index = 0; index < numbers.length; index++) {
        os.push(numbers[index].toString());
    }
    return os;
}

export const generateCountArray = (max: number, start: number = 0): number[] => {
    const res = [];
    for (let index = start; index < max; index++) {
        res.push(index);       
    }
    return res;
}