import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { SignHelper } from '../code/signHelper';
import { RSAPublicKeyResult, AuthResult, SSOResult } from './models/authResult';
import { JSEncrypt } from 'jsencrypt';
import { BusinessError } from '../code/error/businessException';



@Injectable({
    providedIn: 'root'
})
export class AuthApi {

    constructor(
        private client: HttpClientWrapper,
    ) { }

    public async login(username: string, password: string): Promise<AuthResult> {
        //TODO migrate to config
        let requetData = {
            appkey: '1d8b6e7d45233436',
            build: '5290000',
            mobi_app: 'android',
            password: password,
            platform: 'android',
            ts: Date.now(),
            username: username,
            captcha: ""
        };

        //sign
        const appSecret = '560c52ccd288fed045859ed18bffd973';
        requetData["sign"] = SignHelper.md5Sign(requetData, (signString) => signString.concat(appSecret));
        return this.client.post<BiliBiliProtocal<AuthResult>>("passport.api/api/v3/oauth2/login", requetData)
            .pipe(map(x => {
                //TODO handling in AOP
                if (x.code != 0)
                    throw new BusinessError(x.code, x.message);
                return x.data;
            })).toPromise();
    }

    public encryptPassword(password: string): Promise<string> {
        return this.client.get<RSAPublicKeyResult>("passport.api/login", {
            act: 'getkey',
            _: Date.now()
        }).pipe(map(res => {
            let encoding = 'base64';//todo
            let encrypt = new JSEncrypt();
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

