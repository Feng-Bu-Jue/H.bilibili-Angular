import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


export class UserStateModel {
  csrf_token: string
  mid: number
}

export class SetUserSate {
  static readonly type = '[user] setToken';
  constructor(public payload: { csrf_token: string, mid: number }) { }
}

const cookieService = new CookieService(document, <any>'browser');

@State<UserStateModel>({
  name: 'user',
  defaults: {
    csrf_token: cookieService.get('bili_jct'),
    mid: parseInt(cookieService.get('DedeUserID'))
  }
})
export class UserState {
  @Selector()
  static getToken(state: UserStateModel) {
    return state.csrf_token;
  }
  @Selector()
  static getMid(state: UserStateModel) {
    return state.mid;
  }

  constructor(
    private router: Router,
    public ngZone: NgZone,
  ) { }

  @Action(SetUserSate)
  setToken(ctx: StateContext<UserStateModel>, action: SetUserSate) {
    ctx.patchState({
      csrf_token: action.payload.csrf_token,
      mid: action.payload.mid
    });
  }
}