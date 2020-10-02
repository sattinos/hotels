import { MetaData, FieldTypes } from '../entityCRUD/types';
import localizer from '../../controller/lib/localization/localizer';

export const reservationEntityDescriptor: MetaData[] = [
    { name: 'id', type: FieldTypes.inputText, placeholder: localizer.text('reserve.id'), className: 'input', readOnly: true },
    { name: 'createdAt', type: FieldTypes.inputDate, placeholder: localizer.text('reserve.createdAt'), className: 'input', readOnly: true },
    { name: 'updatedAt', type: FieldTypes.inputDate, placeholder: localizer.text('reserve.updatedAt'), className: 'input', readOnly: true }
];
