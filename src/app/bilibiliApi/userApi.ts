import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { UesrInfoResult } from './models/userInfoResult';

@Injectable({
    providedIn: 'root'
})
export class UserApi {

    constructor(
        private client: HttpClientWrapper,
    ) { }

    public getUser(uid: number): Observable<UesrInfoResult> {
        return this.client.get<BiliBiliProtocal<UesrInfoResult>>("api/x/v2/reply", {
            uid: uid,
            user: ['info', 'level'],
            room: ['live_status', 'room_link'],
            feed: ['fans_count', 'feed_count', 'is_followed']
        }).pipe(map(x => x.data));
    }

    public getSpaceInfo(mid: number): Observable<UesrInfoResult> {
        return this.client.get<BiliBiliProtocal<UesrInfoResult>>("api/x/space/acc/info", {
            mid: 1549302,
            jsonp: 'jsonp'
        }).pipe(map(x => x.data));
    }
}
