import { MetaData, FieldTypes } from '../entityCRUD/types';
import localizer from '../../controller/lib/localization/localizer';
import { isStringValid, isDefined } from '../../controller/lib/validators';

export const promoCodeEntityDescriptor: MetaData[] = [
    { name: 'id', type: FieldTypes.inputText, placeholder: localizer.text('promo-code.id'), className: 'input', readOnly: true },
    { name: 'name', type: FieldTypes.inputText, placeholder: localizer.text('promo-code.name'), className: 'input', isValid: isStringValid },
    { name: 'percent', type: FieldTypes.inputDigit, placeholder: localizer.text('promo-code.percent'), className: 'input', isValid: isDefined },
    { name: 'validFrom', type: FieldTypes.inputDate, placeholder: localizer.text('promo-code.validFrom'), className: 'input' },
    { name: 'validTo', type: FieldTypes.inputDate, placeholder: localizer.text('promo-code.validTo'), className: 'input' }
];

// { name: 'value', type: FieldTypes.inputText, placeholder: localizer.text('promo-code.value'), className: 'input', isValid: isStringValid },