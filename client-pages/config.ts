export enum RunMode {
    LocalHost = 0,
    Production = 1
}

export enum ServerPaths {
    beds,
    rooms,
    flatType,
    reservations,
    ur,
    reservationLog,
    promoCode
}

interface Network {
    baseUrl: string;
    paths: string[];
}

class Config {
    private _network: Network;
    private _runMode: RunMode = RunMode.LocalHost;

    private _protocol = ['http', 'http'];
    private _host = ['127.0.0.1', 'your.production.ip.here'];
    private _port = [3000, '80'];

    get baseURL(): string {
        return this._network.baseUrl;
    }

    constructor() {
        this._network = {
            baseUrl: `${this._protocol[this._runMode]}://${this._host[this._runMode]}:${this._port[this._runMode]}`,
            paths: [
                '/beds',
                '/rooms',
                '/flat-type',
                '/reservations',
                '/ur',
                '/reservation-log',
                '/promo-code'
            ]
        };
    }

    public get Network() {
        return this._network;
    }

    public get RunMode() {
        return this._runMode;
    }

}
const config = new Config();
export default config;
