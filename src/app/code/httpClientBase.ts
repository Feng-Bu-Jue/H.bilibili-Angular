import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { BiliBiliProtocol } from '../bilibiliApi/models/bilibiliProtocol';
import { ServiceError } from './error/serviceError';
import { CookieService } from 'ngx-cookie-service';

//把不同的client response抽象一哈
export declare class Response {
    status: number;
    headers: HttpHeaders;
    data: Object;
}

export abstract class HttpClientBase {
    abstract get<TResult>(path: string, params: { [name: string]: any }, options?: { resolveProtocol?: boolean, responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' }): Promise<TResult>
    abstract post<TResult>(path: string, params: { [name: string]: any }, options?: { resolveProtocol?: boolean, responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' }): Promise<TResult>
    protected abstract resolveHttpResponse(rawResponse: any): Response

    protected makeUrl(path: string): string {
        let sections = path.split("/");
        sections[0] = environment.apiProfile[sections[0]];
        return sections.join("/");
    }

    protected makeUrlWithEncodeParams(path: string, params: { [name: string]: any }): string {
        return `${this.makeUrl(path)}?${this.toUrlEncode(params)}`;
    }

    protected toUrlEncode(params: { [name: string]: any }): string {
        let queryString = '';
        if (params) {
            const keys = Object.keys(params);
            queryString = keys.map(key => {
                const value = params[key];
                return this.parseParams(key, value);
            }).join('&');
        }
        return queryString;
    }

    private parseParams(key: string, value: any): string {
        if (value instanceof Array) {
            return value.map(x => this.parseParams(`${key}[]`, x)).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
    }

    protected getHeaders() {
        return {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referrer": "https://www.bilibili.com"
        }
    }

    protected responseHandle<TResult>(requestTask: Promise<any>, resolveProtocol: boolean = true): Promise<TResult> {
        return new Promise<TResult>(async (resolve, reject) => {
            await requestTask.then((res) => {
                let response = this.resolveHttpResponse(res);
                if (resolveProtocol && response.data.hasOwnProperty("code") && response.data.hasOwnProperty("message")) {
                    this.bilibiliProtocolHandle(response, resolve, reject);
                }
                else {
                    //不是BiliBiliProtocol的 自行处理响应
                    resolve(<TResult>response.data)
                }
            }).catch(error => {
                //TODO statuscode handle
                console.log(error);
                reject(error);
            })
        })
    }

    private bilibiliProtocolHandle<TResult>(
        response: Response,
        resolve: (value?: TResult | PromiseLike<TResult>) => void,
        reject: (reason?: any) => void) {
        let data = <BiliBiliProtocol<TResult>>response.data;
        if ([401, 403].includes(response.status) || data.code === 3) {
            reject(new ServiceError(response.status, '你还没有登录呢'));
        }
        else if (data.code && data.code !== 0) {
            switch (data.code) {
                case 1:
                    reject(new ServiceError(response.status, 'bad request?'));
                    break;
                default:
                    reject(response);
                    break;
            }
        }
        else {
            resolve(data.data);
        }
    }
}

export class AngularHttpClient extends HttpClientBase {

    constructor(
        private httpClient: HttpClient
    ) {
        super();
    }

    public async get<TResult>(path: string, params: { [name: string]: any; }, options: { resolveProtocol?: boolean, responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' } = { resolveProtocol: true, responseType: 'json' }): Promise<TResult> {
        return this.responseHandle<TResult>(
            this.httpClient.get(
                this.makeUrlWithEncodeParams(path, params),
                {
                    headers: this.getHeaders(),
                    observe: 'response',
                    responseType: <any>options.responseType,
                    withCredentials: true,
                },
            ).toPromise(),
            options.resolveProtocol
        )
    }

    public async post<TResult>(path: string, params: { [name: string]: any; }, options: { resolveProtocol?: boolean, responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' } = { resolveProtocol: true, responseType: 'json' }): Promise<TResult> {
        return this.responseHandle<TResult>(
            this.httpClient.post(
                this.makeUrl(path),
                this.toUrlEncode(params),
                {
                    headers: this.getHeaders(),
                    observe: 'response',
                    responseType: <any>options.responseType,
                    withCredentials: true,
                }
            ).toPromise(),
            options.resolveProtocol
        )
    }

    protected resolveHttpResponse(rawResponse: any): Response {
        let response = <HttpResponse<Object>>rawResponse
        return {
            status: response.status,
            headers: response.headers,
            data: response.body
        }
    }
}

export class NativeHttpClient extends HttpClientBase {
    constructor(
        private http: HTTP,
        private cookieService: CookieService
    ) {
        super();
        /*
        let cookie = Object.entries(this.cookieService.getAll()).map(([key, value]) => {
            return `${key}=${value}`
        }).join("; ")
        this.http.setCookie(null, cookie);
        */
    }

    public async get<TResult>(path: string, params: { [name: string]: any; }, options: { resolveProtocol?: boolean, responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' } = { resolveProtocol: true, responseType: 'json' }): Promise<TResult> {
        return this.responseHandle<TResult>(
            this.http.sendRequest(
                this.makeUrlWithEncodeParams(path, params),
                {
                    method: 'get',
                    headers: this.getHeaders(),
                    responseType: options.responseType
                }
            ),
            options.resolveProtocol
        )
    }

    public async post<TResult>(path: string, params: { [name: string]: any; }, options: { resolveProtocol?: boolean, responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' } = { resolveProtocol: true, responseType: 'json' }): Promise<TResult> {
        return this.responseHandle<TResult>(
            this.http.sendRequest(
                this.makeUrl(path),
                {
                    method: 'post',
                    params: params,
                    headers: this.getHeaders(),
                    responseType: options.responseType
                }
            ),
            options.resolveProtocol
        )
    }

    protected resolveHttpResponse(rawResponse: any): Response {
        let response = <HTTPResponse>rawResponse
        return {
            status: response.status,
            headers: new HttpHeaders(response.headers),
            data: response.data
        }
    }
}


