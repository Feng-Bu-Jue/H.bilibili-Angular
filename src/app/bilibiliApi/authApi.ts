import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClientBase } from '../code/httpClientBase';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { SignHelper } from '../code/signHelper';
import { RSAPublicKeyResult, AuthResult, SSOResult } from './models/authResult';
import * as JsEncryptModule from 'jsencrypt';
import { ServiceError } from '../code/error/serviceError';

@Injectable({
    providedIn: 'root'
})
export class AuthApi {

    constructor(
        private client: HttpClientBase,
    ) { }

    public async login(username: string, password: string): Promise<AuthResult> {
        //TODO migrate to config
        let requetData = {
            appkey: '1d8b6e7d45233436',
            build: '5290000',
            mobi_app: 'android',
            platform: 'android',
            password: password,
            ts: Date.now(),
            username: username,
            captcha: ""
        };
        //sign
        const appSecret = '560c52ccd288fed045859ed18bffd973';
        requetData["sign"] = SignHelper.md5Sign(requetData, (signString) => signString.concat(appSecret));
        return this.client.post<BiliBiliProtocal<AuthResult>>("passport.api/api/v3/oauth2/login", requetData)
            .then(x => x.data);
    }

    public encryptPassword(password: string): Promise<string> {
        return this.client.get<RSAPublicKeyResult>("passport.api/login", {
            act: 'getkey',
            _: Date.now()
        }).then(res => {
            let encoding = 'base64';
            let encrypt = new JsEncryptModule.JSEncrypt();
            encrypt.setPublicKey(res.key);
            let result = encrypt.encrypt(res.hash.concat(password)).toString(encoding);
            return result;
        });
    }

    public freshSSO(accessToken: string): Promise<SSOResult> {
        return this.client.get<SSOResult>("kaaass.net/biliapi/user/sso", {
            access_key: accessToken,
        });
    }
}

