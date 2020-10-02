import { BaseEntity } from './baseEntity';

export interface PromoCodeEntity extends BaseEntity {
    name: string;
    percent: number;
    value: string;
    validFrom: Date;
    validTo: Date;
}

export const getDefaultPromoCode = (): PromoCodeEntity => {
    const from = new Date();
    from.setUTCHours(11, 0, 0);

    const to = new Date();
    to.setDate( to.getDate() + 10);
    to.setUTCHours(11, 0, 0);

    return {
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),

        name: '',
        percent: 1,
        value: '',
        validFrom: from,
        validTo: to
    };
};
