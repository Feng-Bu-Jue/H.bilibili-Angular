import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpClientWrapper {
    constructor(
        private httpclient: HttpClient,
    ) { }

    public get<TResult>(path: string, param: { [name: string]: any } = null): Promise<TResult> {
        return this.httpclient.get<TResult>(
            this.makeUrlWithQueryString(path, param)
        ).toPromise();
    }

    public post<TResult>(path: string, param: { [name: string]: any } = null): Promise<TResult> {
        return this.httpclient.post<TResult>(
            this.makeUrl(path),
            this.toQueryString(param)
        ).toPromise();
    }

    public jsonp<TResult>(path: string, param: { [name: string]: any } = null): Observable<TResult> {
        if (!param.hasOwnProperty("callback"))
            param.callback = `bilibili${Date.now}`;
        const callback = param.callback;
        return this.httpclient.jsonp<TResult>(this.makeUrlWithQueryString(path, param), callback).pipe(catchError(this.HandleError));
    }

    //#region 
    private makeUrl(path: string): string {
        const host = environment.host;
        return `${path}`;
    }

    private makeUrlWithQueryString(path: string, param: { [name: string]: any }): string {
        return `${this.makeUrl(path)}?${this.toQueryString(param)}`;
    }

    private toQueryString(param: { [name: string]: any }): string {
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
        if (value instanceof Array) {
            return value.map(x => this.paramParser(`${key}[]`, x)).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
    }

    private HandleError(error: HttpErrorResponse): Promise<any> {
        return null;
    }
    //#endregion
}