import networkFetcher from './networkFetcher';
import config from '../../config';

interface UploadedObjectInfo {
    name: string;
    id: string;
}

class FilesUploader {
    private _urls = {
        upload: '/contents-tool/upload',
        uploadmultiple: '/contents-tool/uploads'
    };

    public async uploadSingle(file: File,
                              name: string,
                              onProgress?: (progressInfo: ProgressEvent) => void,
                              onError?: (ev: ErrorEvent) => void,
                              onAbort?: (ev: Event) => void,
                              onComplete?: (ev: Event) => void): Promise<UploadedObjectInfo> {
        const formData = new FormData();
        formData.append(name, file);
        const url = `${config.baseURL}${this._urls.upload}`;
        try {
            return await networkFetcher.uniformPostRequest(url, null, null, formData, onProgress, onError, onComplete, onAbort);
        } catch (err) {
            console.log('---- upload(err) ---');
            console.error(err);
            console.log('-------');
            return {
                name: '',
                id: ''
            };
        }
    }

    public async uploadMultiple(files: File[],
                                name: string,
                                onProgress?: (progressInfo: ProgressEvent) => void,
                                onError?: (ev: ErrorEvent) => void,
                                onAbort?: (ev: Event) => void,
                                onComplete?: (ev: Event) => void): Promise<UploadedObjectInfo[]> {
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            formData.append(name, file);
        }
        const url = `${config.baseURL}${this._urls.uploadmultiple}`;
        try {
            return await networkFetcher.uniformPostRequest(url, null, null, formData, onProgress, onError, onComplete, onAbort);
        } catch (err) {
            console.log('---- upload(err) ---');
            console.error(err);
            console.log('-------');
            return [];
        }
    }
}
const filesUploader = new FilesUploader();
export default filesUploader;
