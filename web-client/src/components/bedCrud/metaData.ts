import { MetaData, FieldTypes } from '../entityCRUD/types';
import localizer from '../../controller/lib/localization/localizer';
import { isStringValid, isArrayValid } from '../../controller/lib/validators';
import { bedTypes } from '../../model/bedEntity';

const bedEntityDescriptor: MetaData[] = [
    { name: 'id', label: localizer.text('bed.id'), type: FieldTypes.inputText, placeholder: localizer.text('bed.id'), className: 'input', readOnly: true },
    { name: 'name', label: localizer.text('bed.name'), type: FieldTypes.inputText, placeholder: localizer.text('bed.name'), className: 'input', isValid: isStringValid },
    { name: 'description', label: localizer.text('bed.description'), type: FieldTypes.inputArea, placeholder: localizer.text('bed.description'), className: 'input', isValid: isStringValid },
    { name: 'type', label: localizer.text('bed.type'), type: FieldTypes.options, title: 'bed.title', options: bedTypes },
    { name: 'filenames', label: localizer.text('bed.images'), type: FieldTypes.inputFile, isValid: isArrayValid }
];

export { bedEntityDescriptor };
