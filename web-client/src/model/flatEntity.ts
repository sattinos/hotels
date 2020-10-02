import { FlatTypeEntity, getDefaultFlatType } from './flatType';
import { BaseEntity } from './baseEntity';

export interface FlatEntity extends BaseEntity {
   type: FlatTypeEntity;
}

export const getDefaultFlat = (): FlatEntity => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    type: getDefaultFlatType()
  };
};
