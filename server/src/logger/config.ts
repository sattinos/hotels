import { MorganConfig } from './morganLogger';
import { resolve } from 'path';
import { LoggerConfig } from '.';
import * as dateformat from 'dateformat';

const normalLogsDirectory = resolve('../log/normal');
const loggerDirectory = resolve('../log/hits');

const morganConfig: MorganConfig = {
  errorFileName: 'access.error',
  fileName: 'access',
  format: 'combined',
  sizeKB: 2 * 500,
  logDirectory: loggerDirectory
};

const loggerConfig: LoggerConfig = {
  errorFileName: 'app.error',
  fileName: 'app',
  sizeKB: 500,
  logDirectory: normalLogsDirectory,
  timeZoneOffset: 3
};

const getRotatedName = (dir, fileName) => {
  return `${dir}/${fileName}-${dateformat()}.log`;
};

export {
  morganConfig,
  loggerConfig,
  getRotatedName
};
