import { Injectable, TypeDecorator, Type } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Buffer } from 'buffer';
import { HttpClientWrapper } from '../code/HttpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { ReplyResult, AddReplyResult } from './models/reply';
import { SignHelper } from '../code/SignHelper';
import { utf8Encode } from '@angular/compiler/src/util';
import { RSAPublicKeyResult, AuthToken, AuthResult, SSOResult } from './models/auth';
import { promise } from 'selenium-webdriver';
import * as JsEncryptModule from 'jsencrypt';

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

    public async login(userName: string, password: string): Promise<AuthResult> {
        //encode handling
        password = await this.encryptPassword(password);

        //TODO migrate to config
        let requetData = {
            appkey: '1d8b6e7d45233436',
            build: '5290000',
            mobi_app: 'android',
            password: password,
            platform: 'android',
            ts: Date.now(),
            username: userName,
            captcha: ""
        };

        //sign
        const appSecret = '560c52ccd288fed045859ed18bffd973';
        requetData["sign"] = SignHelper.md5Sign(requetData, (signString) => signString.concat(appSecret));
        debugger
        return this.client.post<BiliBiliProtocal<AuthResult>>("passport.api/api/v3/oauth2/login", requetData)
            .pipe(map(x => {
                return x.data;
            })).toPromise();
    }

    public encryptPassword(password: string): Promise<string> {
        return this.client.get<RSAPublicKeyResult>("passport.api/login", {
            act: 'getkey',
            _: Date.now()
        }).pipe(map(res => {
            let encoding = 'base64';//todo
            let encrypt = new JsEncryptModule.JSEncrypt();
            encrypt.setPublicKey(res.key);
            let result = encrypt.encrypt(res.hash.concat(password)).toString(encoding);
            return result;
        })).toPromise();
    }

    public freshSSO(accessToken: string): Promise<SSOResult> {
        return this.client.get<SSOResult>("kaaass.net/biliapi/user/sso", {
            access_key: accessToken,
        }).pipe().toPromise();
    }
}

