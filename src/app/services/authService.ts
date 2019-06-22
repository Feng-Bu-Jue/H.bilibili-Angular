import { Injectable, Inject } from '@angular/core';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { Storage } from '@ionic/storage';
import { AuthApi } from '../bilibiliApi/authApi';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public readonly LOGIN_COOKIE = "login_cookie";
    
    public isLoggedin = false;

    private hasSetCookie: boolean = false;

    constructor(
        private client: HttpClientWrapper,
        @Inject(DOCUMENT) private document: any,
        private authApi: AuthApi,
        private storage: Storage,
    ) {}

    public async login(username: string, password: string): Promise<void> {
        let encryptedPassword = await this.authApi.encryptPassword(password);
        let authResult = await this.authApi.login(username, encryptedPassword);
        let ssoResult = await this.authApi.freshSSO(authResult.token_info.access_token);

        return this.storage.set(this.LOGIN_COOKIE, ssoResult.cookie).then((value) => {
            this.setCookie(value);
        })
    }

    public async checkLoggedIn() {
        let value = await this.storage.get(this.LOGIN_COOKIE)
        this.isLoggedin = value != null && value.length > 0;
        if (this.isLoggedin)
            this.setCookie(value)
        return this.isLoggedin;
    }

    private setCookie(value: string) {
        if (!this.hasSetCookie) {
            this.document.cookie = value;//TODO..............
            this.hasSetCookie = true;
        }
    }
}