import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserApi } from 'src/app/bilibiliApi/userApi';


@Component({
  selector: "page-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public data: LinkDrawResult[] = new Array<LinkDrawResult>();
  public pageNum = 0;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private userApi: UserApi,
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  onScrollLower(event: Event, category: string) {
    //this.loadData();
  }

  loadData(event = null) {
    this.linkDrawApi.getDocList(this.pageNum, 10, "illustration", "hot")
      .subscribe(res => {
        this.pageNum++;
        this.data = this.data.concat(res);

        if (event)
          event.target.complete();
        if (this.pageNum >= 100)
          this.infiniteScroll.disabled = true;
      })
  }
}
