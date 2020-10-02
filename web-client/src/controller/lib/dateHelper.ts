const millisecondsADay = 24 * 60 * 60 * 1000;
export const daysBetweenTwoDates = (d1: Date, d2: Date) => {
    return Math.round(Math.abs(d1.getTime() - d2.getTime()) / millisecondsADay);
};
