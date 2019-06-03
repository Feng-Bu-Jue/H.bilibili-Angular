import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApi } from 'src/app/bilibiliApi/userApi';
import { UesrInfoResult } from 'src/app/bilibiliApi/models/userInfoResult';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.checkLoggedIn().then((res) => {
      if (!res) {
        this.router.navigateByUrl("/login");
      }
    });
  }

  ionViewWillEnter() {
    this.authService.checkLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.userApi.getSpaceInfo(1549302).subscribe((res) => {
          this.userInfo = res;
        });
      }
    });
  }




}
