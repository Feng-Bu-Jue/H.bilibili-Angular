import { Component, OnInit, ViewChild } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: "page-photo-list",
  templateUrl: './photo-list.html',
  styleUrls: ['./photo-list.scss']
})
export class PhotoListPage implements OnInit {
  public data: LinkDrawResult[] = new Array<LinkDrawResult>();
  public pageNum = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private linkDrawApi: LinkDrawApi) { }

  async ngOnInit() {
    this.loadData()
  }

  loadData(event = null) {
    this.linkDrawApi.getPhotos(this.pageNum, 10, "cos", "hot")
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
