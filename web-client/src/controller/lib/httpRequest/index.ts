import TypeHelper from '../typeHelper';

export interface HttpRequestData {
    url: string;
    headers: any;
    body: any;
    query: any;
    method: string;
}

export interface HttpResponse {
    status: number;
    text: string;
    obj: XMLHttpRequest;
}

export interface HttpRequestOptions {
    method?: string;
    methodType?: number;
    query?: any;
    headers?: any;
    onProgress?: (progressInfo: ProgressEvent) => void;
    onError?: (errorInfo: ErrorEvent) => void;
    onComplete?: (completeInfo: Event) => void;
    onAbort?: (abortInfo: Event) => void;
    body?: any;
}

export default class HttpRequest {
    private _xhttp: XMLHttpRequest;

    constructor() {
        this._xhttp = new XMLHttpRequest();
    }

    public get xhttp() {
        return this._xhttp;
    }

    public async get(url: string, options: HttpRequestOptions) {
        if (!options) {
            options = {};
        }
        options.method = 'GET';
        return this.request(url, options);
    }

    public async post(url: string, options: HttpRequestOptions) {
        if (!options) {
            options = {};
        }

        options.method = 'POST';
        return this.request(url, options);
    }

    public async put(url: string, options: HttpRequestOptions) {
        if (!options) {
            options = {};
        }

        options.method = 'PUT';
        return this.request(url, options);
    }

    public async request(url: string, options: any) {
        if (!url || !options) {
            if (!url) {
                console.log('missing url in the http request');
            }
            if (!options) {
                console.log('missing options in the http request');
            }
            return null;
        }

        const xhttp = this._xhttp;

        return new Promise((resolve, reject) => {
            const headers = options.headers;
            const query = options.query;

            let first = true;
            let extendedURL = url;
            if (query) {
                const queryKeys = Object.keys(query);
                for (let index = 0; index < queryKeys.length; index++) {
                    const queryItem = queryKeys[index];
                    const preToken = first ? '?' : '&';
                    if (query.hasOwnProperty(queryItem)) {
                        first = false;
                        extendedURL += `${preToken}${queryItem}=${query[queryItem]}`;
                    }
                }
            }

            xhttp.open(options.method, extendedURL, true);
            if (options.withCredentials) {
                xhttp.withCredentials = options.withCredentials;
            }
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    resolve({
                        status: xhttp.status,
                        text: xhttp.responseText,
                        obj: xhttp
                    });
                }
            };

            xhttp.onerror = (ev: ProgressEvent) => {
                if (options.onError) {
                    options.onError(ev);
                }
                reject(ev);
            };

            xhttp.onabort = (ev: Event) => {
                if (options.onAbort) {
                    options.onAbort(ev);
                }
                reject(ev);
            };

            xhttp.onprogress = (ev: ProgressEvent) => {
                if (options.onProgress) {
                    options.onProgress(ev);
                }
            };

            xhttp.onload = (ev: Event) => {
                if (options.onComplete) {
                    options.onComplete(ev);
                }
            };

            if (headers) {
                const headerKeys = Object.keys(headers);
                for (let index = 0; index < headerKeys.length; index++) {
                    const header = headerKeys[index];
                    if (headers.hasOwnProperty(header)) {
                        xhttp.setRequestHeader(header, headers[header]);
                    }
                }
            }

            const type = TypeHelper.whatType(options.body);
            const body = type === 'Json' ? JSON.stringify(options.body) : options.body;
            xhttp.send(body);
        });
    }
}
