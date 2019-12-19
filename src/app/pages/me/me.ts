import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApi } from 'src/app/bilibiliApi/userApi';
import { UesrInfoResult } from 'src/app/bilibiliApi/models/userInfoResult';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/store/user.state';

@Component({
  selector: "page-me",
  templateUrl: './me.html',
  styleUrls: ['./me.scss']
})
export class MePage implements OnInit {

  public userInfo: UesrInfoResult;

  constructor(
    private authService: AuthService,
    private userApi: UserApi,
    private router: Router,
    private store: Store
  ) { }

  async ngOnInit() {
    let mid = this.store.selectSnapshot(UserState.getMid);
    let res = await this.userApi.getSpaceInfo(mid);
    this.userInfo = res;
  }

}
