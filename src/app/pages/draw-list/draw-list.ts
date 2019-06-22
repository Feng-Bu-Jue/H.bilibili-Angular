import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';


@Component({
  selector: "page-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListPage implements OnInit, AfterViewChecked {

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
    this.linkDrawApi.getDocs(this.pageNum, 10, "illustration", "hot")
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
    this.pageNum = 0;
    this.linkDrawApi.getDocs(this.pageNum, 10, "illustration", "hot")
      .subscribe(res => {
        this.pageNum = 1;
        this.data = res;

        this.sourceRefresh = true;
        event.target.complete();
      })
  }
}
