import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll } from '@ionic/angular';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';


@Component({
  selector: "page-photo-list",
  templateUrl: './photo-list.html',
  styleUrls: ['./photo-list.scss']
})
export class PhotoListPage implements OnInit, AfterViewChecked {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(DrawListTemplate) template: DrawListTemplate;

  public data: LinkDrawResult[] = new Array<LinkDrawResult>();
  public pageNum = 0;
  protected sourceRefresh: boolean;

  constructor(
    private linkDrawApi: LinkDrawApi,

  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewChecked(): void {
    if (this.sourceRefresh) {
      this.template.resetWaterfall();
      this.sourceRefresh = false;
    }
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

  doRefresh(event) {
    this.linkDrawApi.getPhotos(this.pageNum, 10, "cos", "hot")
      .subscribe(res => {
        this.pageNum = 1;
        this.data = res;

        this.sourceRefresh = true;
        event.target.complete();
      })
  }
}
