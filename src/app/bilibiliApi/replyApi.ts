import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/HttpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { ReplyResult, AddReplyResult } from './models/reply';

@Injectable()
export class ReplyApi {

    constructor(
        private client: HttpClientWrapper,
        //private userData:UserData
    ) { }

    public getReplies(oid: number,pn:number): Observable<ReplyResult> {
        return this.client.get<BiliBiliProtocal<ReplyResult>>("api/x/v2/reply", {
            oid: oid,
            type: 11,
            pn: 1,
            sort: 0,
            jsonp: 'jsonp'
        }).pipe(map(x => x.data));
    }

    /*
    oid: 3105
    type: 11
    root: 1628504189
    parent: 1628504189
    message: mmmmmm
    plat: 1
    jsonp: jsonp
    csrf: 
    */
    public add(oid: number, message: string, root: number = null, parent: number = null): Observable<AddReplyResult> {
        return this.client.post<BiliBiliProtocal<AddReplyResult>>("api/x/v2/reply/add", {
            oid: oid,
            type: 11,
            message: message,
            root: root,
            parent: parent,
            plat: 1,
            jsonp: 'jsonp',
            csrf: '',
        }).pipe(map(x => x.data));
    }

    public action(oid: number, rpid: number, action: number = 1): Observable<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api/x/v2/reply/action", {
            oid: oid,
            type: 11,
            rpid: rpid,
            action: action,
            jsonp: 'jsonp',
            csrf: '',
        }).pipe(map(x => x.code == 0));
    }

    public hate(oid: number, rpid: number, action: number = 1): Observable<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api/x/v2/reply/hate", {
            oid: oid,
            type: 11,
            rpid: rpid,
            action: action,
            jsonp: 'jsonp',
            csrf: '',
        }).pipe(map(x => x.code == 0));
    }
}