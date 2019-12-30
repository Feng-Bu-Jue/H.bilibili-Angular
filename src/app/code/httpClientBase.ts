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
        let sections = path.split("/");
        sections[0] = environment.apiProfile[sections[0]];
        return sections.join("/");
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
}

export class MobileHttpClient extends HttpClientBase {
    constructor(
        private httpclient: HttpClient
    ) {
        super();
    }

    public get<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        return this.httpclient.get<TResult>(
            this.makeUrlWithEncodeParams(path, param),
            {
                headers: this.getHeaders()
            }
        ).toPromise();
    }

    public post<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        return this.httpclient.post<TResult>(
            this.makeUrl(path),
            this.toUrlEncode(param),
            {
                headers: this.getHeaders()
            }
        ).toPromise();
    }
}

export class PhoneDeviceHttpClient extends HttpClientBase {
    constructor(
        private http: HTTP,
    ) {
        super();
    }
    public async get<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        let response = await this.http.get(this.makeUrlWithEncodeParams(path, param), null, this.getHeaders());
        return JSON.parse(response.data);
    }

    public async post<TResult>(path: string, param: { [name: string]: any; }): Promise<TResult> {
        let response = await this.http.post(this.makeUrl(path), this.toUrlEncode(param), this.getHeaders());
        return JSON.parse(response.data);
    }
}

//TODO 抽象一个公共的拦截器 使用rx 发射事件流？深坑啊！
export class HttpInterceptor {


}
