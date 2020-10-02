import * as crypto from 'crypto';

export const generateRandomToken = (length: number): string => {
    const seed = crypto.randomBytes(length);
    return crypto.createHash('sha1').update(seed + new Date().getTime().toString()).digest('hex');
};

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
};
