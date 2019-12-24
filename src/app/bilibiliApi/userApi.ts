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

    public getUser(uid: number): Promise<UesrInfoResult> {
        return this.client.get<BiliBiliProtocal<UesrInfoResult>>("api/x/v2/reply", {
            uid: uid,
            user: ['info', 'level'],
            room: ['live_status', 'room_link'],
            feed: ['fans_count', 'feed_count', 'is_followed']
        }).then(r => r.data);
    }

    public getSpaceInfo(mid: number): Promise<UesrInfoResult> {
        return this.client.get<BiliBiliProtocal<UesrInfoResult>>("api/x/space/acc/info", {
            mid: mid,
            jsonp: 'jsonp'
        }).then(r => r.data);
    }

    public getMyFav(page: number, pageSize: number): Promise<any> {
        return this.client.get<BiliBiliProtocal<any>>("api.vc/user_plus/v1/Fav/getMyFav", {
            biz_type: 2,
            page: 1,
            pagesize: 30,
            _: Date.now
        }).then(r => r.data);
    }

    public attention(uid: number, type: number): Promise<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api.live/liveact/attention", {
            uid,
            type
        }).then(r => r.code === 0);
    }
}
