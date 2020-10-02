import { isNumeric } from './validators';

export default class TypeHelper {
    public static whatType(object: any) {
        if (object === null) {
            return 'null';
        }
        if (object === undefined) {
            return 'undefined';
        }

        if (object.constructor === this.arrayConstructor) {
            return 'Array';
        }

        if (object.constructor === this.objectConstructor) {
            return 'Json';
        }

        if (object.constructor === this.fileConstructor) {
            return 'File';
        }

        if (object.constructor === this.stringConstructor) {
            return 'String';
        }

        if (isNumeric(object)) {
            return 'Number';
        }

        return 'undeterminded';
    }

    private static stringConstructor = 'test'.constructor;
    private static arrayConstructor = [].constructor;
    private static objectConstructor = {}.constructor;
    private static fileConstructor = File.constructor;
}
