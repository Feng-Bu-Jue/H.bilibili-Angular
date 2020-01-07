import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthApi } from '../bilibiliApi/authApi';
import { CookieService } from 'ngx-cookie-service';
import { Store, Select } from '@ngxs/store';
import { SetUserState, UserState } from '../store/user.state';
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
        let csrf_token = cookies.find(x => x.includes("bili_jct")).split("=")[1];
        let mid = parseInt(cookies.find(x => x.includes("DedeUserID")).split("=")[1]);
        return this.store.dispatch(new SetUserState({ csrf_token, mid }))
    }

    public isLoggedIn(): boolean {
        let token = this.store.selectSnapshot(UserState.getToken);
        return token && token.length > 0
    }

    private setCookie(cookies: Array<string>) {
        cookies.forEach(item => {
            let [key, value] = item.split("=");
            let expires = new Date();
            expires.setDate(new Date().getDate() + 30);
            this.cookieService.set(key, value, expires, "/");
        });
    }
}