import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { ReplyResult, AddReplyResult } from './models/replyResult';

@Injectable({
    providedIn: 'root'
})
export class ReplyApi {

    constructor(
        private client: HttpClientWrapper,
    ) { }

    public getReplies(oid: number, pn: number): Promise<ReplyResult> {
        return this.client.get<BiliBiliProtocal<ReplyResult>>("api/x/v2/reply", {
            oid: oid,
            type: 11,
            pn: pn,
            sort: 0,
            jsonp: 'jsonp'
        }).then(x => x.data);
    }

    public add(oid: number, message: string, root: number = null, parent: number = null): Promise<AddReplyResult> {
        return this.client.post<BiliBiliProtocal<AddReplyResult>>("api/x/v2/reply/add", {
            oid: oid,
            type: 11,
            message: message,
            root: root,
            parent: parent,
            plat: 1,
            jsonp: 'jsonp',
            csrf: '',
        }).then(x => x.data);
    }

    public action(oid: number, rpid: number, action: number = 1): Promise<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api/x/v2/reply/action", {
            oid: oid,
            type: 11,
            rpid: rpid,
            action: action,
            jsonp: 'jsonp',
            csrf: '',
        }).then(x => x.code == 0);
    }

    public hate(oid: number, rpid: number, action: number = 1): Promise<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api/x/v2/reply/hate", {
            oid: oid,
            type: 11,
            rpid: rpid,
            action: action,
            jsonp: 'jsonp',
            csrf: '',
        }).then(x => x.code == 0);
    }
}