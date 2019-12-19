import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

export class UserStateModel {
  csrf_token: string
}

export class SetToken {
  static readonly type = '[user] setToken';
  constructor(public payload: { csrf_token: any }) { }
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    csrf_token: ''
  }
})
export class UserState {
  @Selector()
  static getToken(state: UserStateModel) {
    return state.csrf_token;
  }
  constructor(
    private router: Router,
    public ngZone: NgZone) {

  }
  @Action(SetToken)
  setToken(ctx: StateContext<UserStateModel>, action: SetToken) {
    ctx.patchState({
      csrf_token: action.payload.csrf_token
    });
  }
}