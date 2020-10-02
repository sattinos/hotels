import * as fs from 'fs-extra';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { loggerConfig, getRotatedName } from './config';
const { combine, timestamp, label, printf } = winston.format;

export interface LoggerConfig {
    logDirectory: string;
    errorFileName: string;
    fileName: string;
    sizeKB: number;
    timeZoneOffset: number;
}

/*
 * Logger class that is better to create it before start app, then start app through cb parameter
 */
class Logger {
    private _config: LoggerConfig;
    private _winstonLogger: winston.Logger;
    private _ready = false;

    setup() {
        if (this._ready) {
            return;
        }
        this._config = loggerConfig;
        fs.ensureDirSync(this._config.logDirectory);

        const rotatingFileTransport = new DailyRotateFile({
            filename: `${this._config.logDirectory}/%DATE%-${this._config.fileName}.log`,
            maxSize: `${this._config.sizeKB}k`
        });

        rotatingFileTransport.on('rotate', (_oldFile: string, newFile: string) => {
            const renamed = getRotatedName(this._config.logDirectory, this._config.fileName);
            fs.rename(newFile, renamed);
            // console.log(_oldFile, ' => ', newFile);
        });

        const messageFormat = printf(info => {
            return `${info.timestamp} [${info.label}] ${info.message}`;
        });

        this._winstonLogger = winston.createLogger({
            level: 'info',
            transports: [
                rotatingFileTransport,
                new winston.transports.Console()
            ],
            format: combine(
                label({ label: 'suscribers 2.0' }),
                timestamp(),
                messageFormat
            )
        });

        this._ready = true;
    }

    public get winstonLogger(): winston.Logger {
        return this._winstonLogger;
    }
}
const appLogger = new Logger();
export default appLogger;