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
            this.makeUrlWithEncodeParams(path, param)
        ).toPromise();
    }

    public post<TResult>(path: string, param: { [name: string]: any } = null): Promise<TResult> {
        return this.httpclient.post<TResult>(
            this.makeUrl(path),
            this.toUrlEncode(param)
        ).toPromise();
    }

    public jsonp<TResult>(path: string, param: { [name: string]: any } = null): Observable<TResult> {
        if (!param.hasOwnProperty("callback"))
            param.callback = `bilibili${Date.now}`;
        const callback = param.callback;
        return this.httpclient.jsonp<TResult>(this.makeUrlWithEncodeParams(path, param), callback);
    }

    //#region 
    private makeUrl(path: string): string {
        let setions = path.split("/");
        setions[0] = environment.apiProfile[setions[0]];
        return setions.join("/");
    }

    private makeUrlWithEncodeParams(path: string, param: { [name: string]: any }): string {
        return `${this.makeUrl(path)}?${this.toUrlEncode(param)}`;
    }

    private toUrlEncode(param: { [name: string]: any }): string {
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
    //#endregion
}