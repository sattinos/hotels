import { extname, basename } from 'path';
import { MulterOptions } from '@nestjs/common/interfaces/external/multer-options.interface';
import { diskStorage } from 'multer';

class StorageConfig {
    uploadedFileRelativePath: string;
    standardFileNamingCallback: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => void;
    singleFileMulterOptions: MulterOptions;
}
const storageConfig = new StorageConfig();

storageConfig.uploadedFileRelativePath = './data/uploaded-files';

storageConfig.standardFileNamingCallback = (_req: Express.Request, file: Express.Multer.File, cb) => {
    const ext = extname(file.originalname);
    const name = basename(file.originalname, ext);
    cb(null, `${name + '-' + Date.now()}${ext}`);
};

storageConfig.singleFileMulterOptions = {
    storage: diskStorage({
        destination: storageConfig.uploadedFileRelativePath,
        filename: storageConfig.standardFileNamingCallback
    }),
};

export default storageConfig;

try {
    // tslint:disable-next-line:no-var-requires
    require('./config.prod');
} catch (err) {
    // tslint:disable-next-line:no-console
    // console.error(err);
}