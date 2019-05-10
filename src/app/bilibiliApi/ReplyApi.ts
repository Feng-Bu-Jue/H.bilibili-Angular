import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/HttpClientWrapper';
import { BiliBiliProtocal } from './models/BiliBiliProtocal';
import { ReplyResult } from './models/Reply';

@Injectable()
export class ReplyApi {

    constructor(
        private client: HttpClientWrapper
    ) { }

    public getReplies(oid: number): Observable<ReplyResult> {
        return this.client.get<BiliBiliProtocal<ReplyResult>>("api/x/v2/reply", {
            oid: oid,
            type: 11,
            pn: 1,
            sort: 0,
            jsonp: 'jsonp'
        }).pipe(map(x => x.data));
    }

    /*
    comment https://api.bilibili.com/x/v2/reply/add
    oid: 20570091
    type: 11
    message: 太棒了(test comment)
    plat: 1
    jsonp: jsonp
    csrf: abbd11f8a17b882a8ee2d3801fb377da
    */
    public addRelpy(): void {

    }
}