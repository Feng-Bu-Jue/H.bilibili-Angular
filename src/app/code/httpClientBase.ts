import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastService } from '../services/toastService';
import { Platform } from '@ionic/angular';

export abstract class HttpClientBase {

    abstract get<TResult>(path: string, param: { [name: string]: any }): Promise<TResult>
    abstract post<TResult>(path: string, param: { [name: string]: any }): Promise<TResult>

    protected makeUrl(path: string): string {
        let setions = path.split("/");
        setions[0] = environment.apiProfile[setions[0]];
        return setions.join("/");
    }

    protected makeUrlWithEncodeParams(path: string, param: { [name: string]: any }): string {
        return `${this.makeUrl(path)}?${this.toUrlEncode(param)}`;
    }

    protected toUrlEncode(param: { [name: string]: any }): string {
        let queryString = '';
        if (param) {
            const keys = Object.keys(param);
            queryString = keys.map(key => {
                const value = param[key];
                return this.Parseparam(key, value);
            }).join('&');
        }
        return queryString;
    }

    private Parseparam(key: string, value: any): string {
        if (value instanceof Array) {
            return value.map(x => this.Parseparam(`${key}[]`, x)).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
    }
}

@Injectable({
    providedIn: 'root'
})
export class MobileHttpClient extends HttpClientBase {
    constructor(
        private httpclient: HttpClient,
        private toastService: ToastService
    ) {
        super();
    }

    public get<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        return this.httpclient.get<TResult>(
            this.makeUrlWithEncodeParams(path, param)
        ).toPromise();
    }

    public post<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        return this.httpclient.post<TResult>(
            this.makeUrl(path),
            this.toUrlEncode(param)
        ).toPromise();
    }
}

@Injectable({
    providedIn: 'root'
})
export class PhoneDeviceHttpClient extends HttpClientBase {
    constructor(
        private http: HTTP,
        private toastService: ToastService
    ) {
        super();
    }
    public async get<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        let response = await this.http.get(this.makeUrlWithEncodeParams(path, param), null, null);
        return JSON.parse(response.data);
    }

    public async post<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        let response = await this.http.post(this.makeUrlWithEncodeParams(path, param), null, null);
        return JSON.parse(response.data);
    }
}
