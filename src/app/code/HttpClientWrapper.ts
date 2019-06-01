import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpClientWrapper {
    constructor(
        private httpclient: HttpClient
    ) { }

    public get<TResult>(path: string, param: { [name: string]: any } = null): Observable<TResult> {
        return this.httpclient.get<TResult>(this.GetUrlWithQueryString(path, param)).pipe(catchError(this.HandleError));
    }

    public post<TResult>(path: string, param: { [name: string]: any } = null): Observable<TResult> {
        return this.httpclient.post<TResult>(this.GetUrl(path), param).pipe(catchError(this.HandleError));
    }

    public jsonp<TResult>(path: string, param: { [name: string]: any } = null): Observable<TResult> {
        if (!param.hasOwnProperty("callback"))
            param.callback = `bilibili${new Date().getTime()}`;
        const callback = param.callback;
        return this.httpclient.jsonp<TResult>(this.GetUrlWithQueryString(path, param), callback).pipe(catchError(this.HandleError));
    }

    private GetUrl(path: string): string {
        //TODO
        const host = 'http://localhost:3000/';
        return `${host}${path}`;
    }

    private GetUrlWithQueryString(path: string, param: { [name: string]: any }): string {
        return `${this.GetUrl(path)}?${this.ToQueryString(param)}`;
    }

    private ToQueryString(param: { [name: string]: any }): string {
        let queryString = '';
        if (param) {
            const keys = Object.keys(param);
            queryString = keys.map(key => {
                const value = param[key];
                return this.paramParser(key, value);
            }).join('&');
        }
        return queryString;
    }

    private paramParser(key: string, value: any): string {
        //TODO x.toString(); 
        if (value instanceof Array) {
            return value.map(x => `${key}[]=${x.toString()}`).join('&');
        }
        return `${key}=${value}`;
    }

    private HandleError(error: HttpErrorResponse): Promise<any> {
        return Promise.reject(error);
    }
}