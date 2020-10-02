import * as fs from 'fs-extra';
import * as morgan from 'morgan';
import { INestApplication } from '@nestjs/common';
import { morganConfig, getRotatedName } from './config';

// tslint:disable-next-line:no-var-requires
const rotatingLogStream = require('file-stream-rotator');

export interface MorganConfig {
  format: 'combined' | 'common' | 'dev' | 'short' | 'tiny';
  logDirectory: string;
  errorFileName: string;
  fileName: string;
  sizeKB: number;
}

class MorganLogger {
  private _config: MorganConfig;
  setup(app: INestApplication) {
    this._config = morganConfig;

    fs.ensureDirSync(this._config.logDirectory);

    const accessLogStream = rotatingLogStream.getStream({
      filename: `${this._config.logDirectory}/%DATE%-${this._config.fileName}.log`,
      frequency: 'custom',
      verbose: false,
      date_format: 'YYYY-MM-DD',
      size: `${this._config.sizeKB}k`
    });

    // accessLogStream.on('error', err => console.log('normal stream error', err));
    //  accessLogStream.on('warning', err => console.log('normal stream warning', err));
    accessLogStream.on('rotate', (_oldFile: string, newFile: string) => {
      const renamed = getRotatedName(this._config.logDirectory, this._config.fileName);
      fs.rename(newFile, renamed);
      // console.log(_oldFile, ' => ', newFile);
    });
    app.use(
      morgan(this._config.format, {
        stream: accessLogStream,
        skip: (_req, res) => {
          return res.statusCode >= 400;
        }
      })
    );

    const errorStream = rotatingLogStream.getStream({
      filename: `${this._config.logDirectory}/%DATE%-${this._config.errorFileName}.log`,
      frequency: 'custom',
      verbose: false,
      date_format: 'YYYY-MM-DD',
      size: `${this._config.sizeKB}k`
    });
    // errorStream.on('error', err => console.log('errStream error', err));
    // errorStream.on('warning', err => console.log('errStream warning', err));
    errorStream.on('rotate', (_oldFile: string, newFile: string) => {
      const renamed = getRotatedName(this._config.logDirectory, this._config.errorFileName);
      fs.rename(newFile, renamed);
      // console.log(_oldFile, ' => ', newFile);
    });
    app.use(
      morgan(this._config.format, {
        stream: errorStream,
        skip: (_req, res) => {
          return res.statusCode < 400;
        }
      })
    );

    app.use(morgan(this._config.format));
  }
}

const morganLogger = new MorganLogger();
export default morganLogger;
