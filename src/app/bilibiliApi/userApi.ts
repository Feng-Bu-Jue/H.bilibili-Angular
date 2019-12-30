import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientBase } from '../code/httpClientBase';
import { UesrInfoResult } from './models/userInfoResult';

@Injectable({
    providedIn: 'root'
})
export class UserApi {

    constructor(
        private client: HttpClientBase,
    ) { }

    public getUser(uid: number): Promise<UesrInfoResult> {
        return this.client.get<UesrInfoResult>("api/x/v2/reply", {
            uid: uid,
            user: ['info', 'level'],
            room: ['live_status', 'room_link'],
            feed: ['fans_count', 'feed_count', 'is_followed']
        });
    }

    public getSpaceInfo(mid: number): Promise<UesrInfoResult> {
        return this.client.get<UesrInfoResult>("api/x/space/acc/info", {
            mid: mid,
            jsonp: 'jsonp'
        });
    }

    public getMyFav(page: number, pageSize: number): Promise<any> {
        return this.client.get<any>("api.vc/user_plus/v1/Fav/getMyFav", {
            biz_type: 2,
            page: 1,
            pagesize: 30,
            _: Date.now
        });
    }

    public attention(uid: number, type: number): Promise<void> {
        return this.client.post<any>("api.live/liveact/attention", {
            uid,
            type
        })
    }
}
