import { Injectable, Inject } from '@angular/core';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { Storage } from '@ionic/storage';
import { AuthApi } from '../bilibiliApi/authApi';
import { DOCUMENT } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Store, Select } from '@ngxs/store';
import { SetUserSate, UserState } from '../store/user.state';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    @Select(UserState.getToken) token: Observable<string>;

    constructor(
        private authApi: AuthApi,
        private store: Store,
        private cookieService: CookieService
    ) { }

    public async login(username: string, password: string): Promise<any> {
        let encryptedPassword = await this.authApi.encryptPassword(password);
        let authResult = await this.authApi.login(username, encryptedPassword);
        let ssoResult = await this.authApi.freshSSO(authResult.token_info.access_token);

        let cookies = ssoResult.cookie.split("; ").filter(x => x);
        this.setCookie(cookies);
        //set token
        let csrf_token = cookies.find(x => <boolean><unknown>(~x.search("bili_jct")));
        let mid = parseInt(cookies.find(x => <boolean><unknown>(~x.search("DedeUserID"))));
        return this.store.dispatch(new SetUserSate({ csrf_token, mid }))
    }

    public async isLoggedIn(): Promise<boolean> {
        let token = await this.store.selectSnapshot(UserState.getToken);
        return token && token.length > 0
    }

    private setCookie(cookies: Array<string>) {
        cookies.forEach(item => {
            let [key, value] = item.split("=");
            this.cookieService.set(key, value, new Date().setDate(new Date().getDate() + 30));
        });
    }
}