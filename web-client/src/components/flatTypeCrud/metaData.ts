import { MetaData, FieldTypes } from '../entityCRUD/types';
import localizer from '../../controller/lib/localization/localizer';
import { isStringValid, isArrayValid, isDefined } from '../../controller/lib/validators';

export const flatTypeDescriptor: MetaData[] = [
    { name: 'id', label: localizer.text('flatType.id'),  type: FieldTypes.inputText, placeholder: localizer.text('flatType.id'), className: 'input', readOnly: true },
    { name: 'name', label: localizer.text('flatType.name'), type: FieldTypes.inputText, placeholder: localizer.text('flatType.name'), className: 'input', isValid: isStringValid },
    { name: 'type', label: localizer.text('flatType.type'), type: FieldTypes.inputText, placeholder: localizer.text('flatType.type'), className: 'input', isValid: isStringValid },
    { name: 'price', label: localizer.text('flatType.price'), type: FieldTypes.inputDigit, placeholder: localizer.text('flatType.price'), className: 'input', isValid: isDefined },
    { name: 'count', label: localizer.text('flatType.count'), type: FieldTypes.inputDigit, placeholder: localizer.text('flatType.count'), className: 'input', isValid: isDefined },
    { name: 'area', label: localizer.text('flatType.area'), type: FieldTypes.inputDigit, placeholder: localizer.text('flatType.area'), className: 'input', isValid: isDefined },
    { name: 'description', label: localizer.text('flatType.description'), type: FieldTypes.inputText, placeholder: localizer.text('flatType.description'), className: 'input', isValid: isStringValid },
    { name: 'images', label: localizer.text('flatType.images'), type: FieldTypes.inputFile, isValid: isArrayValid }
];

export const flatTypeDescriptorCreate = flatTypeDescriptor.slice(1);
