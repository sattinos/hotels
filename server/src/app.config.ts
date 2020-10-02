export enum RunMode {
    Development,
    Production,
    WebPack
}

export interface SSLConfig {
    key: string;
    crt: string;
    ca: string;
}

export interface HttpServerConfig {
    host: string;
    port: number;
    sslPath: SSLConfig;
    isSecure: boolean;
}

class Config {
    public httpServerConfig: HttpServerConfig;
    public runMode: RunMode;

    constructor() {
        this.httpServerConfig = {
            host: '127.0.0.1',
            port: 3000,
            sslPath: {
                key: '',
                crt: '',
                ca: ''
            },
            isSecure: false
        };
        // TODO: change run mode
        this.runMode = RunMode.Development;
    }

    public get baseUrl() {
        return `http://${this.httpServerConfig.host}:${this.httpServerConfig.port}`;
    }
}

const config = new Config();
export default config;

try {
    // tslint:disable-next-line:no-var-requires
    const extend = require('./app.config.prod');
    extend.default();
} catch (ex) {
    // tslint:disable-next-line:no-console
    console.log('app config error: ', ex);
}