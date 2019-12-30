import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientBase } from '../code/httpClientBase';
import { ReplyResult, AddReplyResult } from './models/replyResult';

@Injectable({
    providedIn: 'root'
})
export class ReplyApi {

    constructor(
        private client: HttpClientBase,
    ) { }

    public getReplies(oid: number, pn: number): Promise<ReplyResult> {
        return this.client.get<ReplyResult>("api/x/v2/reply", {
            oid: oid,
            type: 11,
            pn: pn,
            sort: 0,
            jsonp: 'jsonp'
        });
    }

    public add(oid: number, message: string, root: number = null, parent: number = null): Promise<AddReplyResult> {
        return this.client.post<AddReplyResult>("api/x/v2/reply/add", {
            oid: oid,
            type: 11,
            message: message,
            root: root,
            parent: parent,
            plat: 1,
            jsonp: 'jsonp',
            csrf: '',
        });
    }

    public action(oid: number, rpid: number, action: number = 1): Promise<void> {
        return this.client.post("api/x/v2/reply/action", {
            oid: oid,
            type: 11,
            rpid: rpid,
            action: action,
            jsonp: 'jsonp',
            csrf: '',
        });
    }

    public hate(oid: number, rpid: number, action: number = 1): Promise<void> {
        return this.client.post("api/x/v2/reply/hate", {
            oid: oid,
            type: 11,
            rpid: rpid,
            action: action,
            jsonp: 'jsonp',
            csrf: '',
        });
    }
}