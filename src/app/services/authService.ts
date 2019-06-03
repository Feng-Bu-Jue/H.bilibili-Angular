import { Injectable } from '@angular/core';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { UserApi } from '../bilibiliApi/userApi';
import { Storage } from '@ionic/storage';
import { AuthApi } from '../bilibiliApi/authApi';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public readonly LOGIN_COOKIE = "login_cookie";

    private hasSetCookie: boolean = false;

    constructor(
        private client: HttpClientWrapper,
        private authApi: AuthApi,
        private storage: Storage,
        private cookieService:CookieService
    ) { }

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
        let hasLoggedIn = value != null && value.length > 0;
        if (hasLoggedIn)
            this.setCookie(value)
        return hasLoggedIn;
    }

    private setCookie(value: string) {
        if (!this.hasSetCookie) {
            window.document.cookie=value;//TODO..............
            this.hasSetCookie = true;
        }
    }

}