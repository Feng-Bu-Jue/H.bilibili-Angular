import { Injectable, TypeDecorator, Type } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/HttpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { ReplyResult, AddReplyResult } from './models/reply';
import { defineDirective } from '@angular/core/src/render3';
import { ANNOTATIONS } from '@angular/core/src/util/decorators';
import { Md5 } from "ts-md5";
import { SignHelper } from '../code/SignHelper';

@Injectable()
export class UserApi {

    constructor(
        private client: HttpClientWrapper,
    ) { }

    public getUser(uid: number): Observable<ReplyResult> {
        return this.client.get<BiliBiliProtocal<ReplyResult>>("api/x/v2/reply", {
            uid: uid,
            user: ['info', 'level'],
            room: ['live_status', 'room_link'],
            feed: ['fans_count', 'feed_count', 'is_followed']
        }).pipe(map(x => x.data));
    }

    public login(username: string, password: string) {
        let requetData = {
            appkey: '1d8b6e7d45233436',
            build: '5290000',
            mobi_app: 'android',
            password: encodeURIComponent(password),
            platform: 'android',
            ts: Date.now(),
            username: username,
        };
        //todo migration to config
        const appSecret = '560c52ccd288fed045859ed18bffd973';
        let sign = SignHelper.md5Sign(requetData, (signString) => signString.concat(appSecret));
        requetData["sign"] = sign;
        return this.client.post<BiliBiliProtocal<ReplyResult>>("passport.api/api/v3/oauth2/login", requetData).pipe(map(x => x.data));
    }

    public getPublicKey(): Observable<string> {
        return this.client.get<BiliBiliProtocal<ReplyResult>>("passport.api/login", {
            act: 'getkey',
            _: Date.now()
        }).pipe(map(x => {
            
            return "";
        }))
    }
}

