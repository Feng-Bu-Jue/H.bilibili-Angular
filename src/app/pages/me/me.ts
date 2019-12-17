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
  public userInfo2 = { "mid": 1549302, "name": "永无止尽の夜", "sex": "男", "face": "http://i2.hdslb.com/bfs/face/f0df8b24788e76d1a6809a15f38cd31cab28928f.jpg", "sign": "在这个娱乐至死，信息爆炸的年代。即使我们24小时都在消费内容，能感知到的亦是有限的，所以我们只能相信我们所看到的，或者是愿意看到的。", "rank": 10000, "level": 5, "jointime": 0, "moral": 0, "silence": 0, "birthday": "01-14", "coins": 686.8, "fans_badge": false, "official": { "role": 0, "title": "", "desc": "" }, "vip": { "type": 2, "status": 1, "theme_type": 0 }, "is_followed": false, "top_photo": "http://i2.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png", "theme": {} }

  constructor(
    private authService: AuthService,
    private userApi: UserApi,
    //private router: Router
  ) { }

  async ngOnInit() {
    await this.userApi.getSpaceInfo(1549302);
  }

}
