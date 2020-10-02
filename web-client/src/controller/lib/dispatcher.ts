export default class Dispatcher {
    private _listeners: Array<(data?: any) => void> = [];

    constructor() {
        this._listeners = [];
    }
    public dispatch(data?: any) {
        const count = this._listeners.length;
        for (let i = 0; i < count; i++) {
            this._listeners[i](data);
        }
    }

    public register(listener: (data?: any) => void) {
        this._listeners.push(listener);
    }

    public unregister(listener: (data?: any) => void) {
        const index = this._listeners.findIndex((item) => item === listener);
        this._listeners.splice(index, 1);
    }

    public unregisterAll() {
        this._listeners.splice(0, this._listeners.length);
    }
}