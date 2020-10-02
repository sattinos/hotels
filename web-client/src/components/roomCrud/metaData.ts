import { MetaData, FieldTypes } from '../entityCRUD/types';
import localizer from '../../controller/lib/localization/localizer';
import { isStringValid, isArrayValid } from '../../controller/lib/validators';
import { roomTypes } from '../../model/roomEntity';

const roomEntityDescriptor: MetaData[] = [
    { name: 'id', label: localizer.text('room.id'), type: FieldTypes.inputText, placeholder: localizer.text('bedRoom.id'), className: 'input', readOnly: true },
    { name: 'name', label: localizer.text('room.name'), type: FieldTypes.inputText, placeholder: localizer.text('bedRoom.name'), className: 'input', isValid: isStringValid },
    { name: 'bedsIDs', label: localizer.text('room.beds'), type: FieldTypes.custom, placeholder: localizer.text('bedRoom.bedsIds'), className: 'input', isValid: isArrayValid, readOnly: true },
    { name: 'description', label: localizer.text('room.description'), type: FieldTypes.inputArea, placeholder: localizer.text('bedRoom.description'), className: 'input', isValid: isStringValid },
    { name: 'type', label: localizer.text('room.type'), type: FieldTypes.options, title: 'room.type', options: roomTypes },
];

export { roomEntityDescriptor };
