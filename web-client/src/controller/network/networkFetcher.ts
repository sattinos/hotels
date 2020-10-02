import HttpRequest from '../lib/httpRequest';

export interface CommonResponse {
    isSuccess: boolean;
    data?: any;
    err?: any;
}

class NetworkFetcher {
    public async uniformGetRequest(url: string, headers: any, query: any) {
        try {
            const httpRequester = new HttpRequest();
            const data: any = await httpRequester.get(url, {
                headers,
                query
            });
            if (data && (data.status === 200) && data.text) {
                return JSON.parse(data.text);
            }
            return null;
        } catch (error) {
            console.log('------- GET URL Error -------------');
            console.log(url);
            console.log(error);
            console.log('--------------------');
            return null;
        }
    }

    public async uniformPostRequest(url: string,
                                    headers: any,
                                    query: any,
                                    body: any,
                                    onProgress?: (progressInfo: ProgressEvent) => void,
                                    onError?: (errorInfo: ErrorEvent) => void,
                                    onComplete?: (completeInfo: Event) => void,
                                    onAbort?: (abortInfo: Event) => void) {
        try {
            const httpRequester = new HttpRequest();
            const data: any = await httpRequester.post(url, {
                headers,
                query,
                body,
                onProgress,
                onError,
                onComplete,
                onAbort
            });

            httpRequester.xhttp.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded * 100) / e.total);
                    console.log('listen: ', percentage);
                }
            }, false);

            if (data && data.text && data.text.length > 0) {
                return JSON.parse(data.text);
            }
            return null;
        } catch (error) {
            console.log('------- POST URL Error -------------');
            console.log(url);
            console.log(error);
            console.log('--------------------');
            return null;
        }
    }

    public async uniformPutRequest(url: string, headers: any, query: any, body: any) {
        try {
            const httpRequester = new HttpRequest();
            const data: any = await httpRequester.put(url, {
                headers,
                query,
                body
            });
            if (data && (data.status === 200) && data.text) {
                return JSON.parse(data.text);
            }
            return null;
        } catch (error) {
            console.log('------- PUT URL Error -------------');
            console.log(url);
            console.log(error);
            console.log('--------------------');
            return null;
        }
    }
}
const networkFetcher = new NetworkFetcher();
export default networkFetcher;
