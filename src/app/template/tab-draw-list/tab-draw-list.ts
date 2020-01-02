import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, ViewChildren, QueryList, HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult, LinkDrawResultList } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll, IonSlide, IonSlides, IonContent } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { Enum_DrawCategory, Enum_Biz, Enum_RankType } from 'src/app/bilibiliApi/models/Enum';
import { LoadingService } from 'src/app/services/loadingService';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Tab } from 'src/app/components/tab/tab.component';


@Component({
  selector: "template-tab-draw-list",
  templateUrl: './tab-draw-list.html',
  styleUrls: ['./tab-draw-list.scss']
})
export class TabDrawListTemplate implements OnInit {

  @Input()
  public tabTitle: Array<string>;
  @Input()
  public categories: Array<Enum_DrawCategory>;
  @Input()
  public biz: Array<Enum_Biz>;
  @HostBinding('class.ion-page')
  ionpage = true;

  public get scorllHeight() {
    let height = this.content["el"].clientHeight;
    return height + 'px';
  }

  private _activeIndex: number = 0;

  public set activeIndex(value) {
    this._activeIndex = value;
    this.slides.slideTo(value);
  }
  public get activeIndex() {
    return this._activeIndex
  };

  public data = new Array<Array<LinkDrawResult>>([], []);
  public pageNum = new Array<number>(0, 0);
  public disableScrollEvent: boolean = false;

  public slideOpts = {
    initialSlide: this.activeIndex,
    speed: 400,
    zoom: false,
    resistanceRatio: 0
  };

  public movingPosition = 0;
  public isMoving = false;

  @ViewChild('ionContent', { static: true }) content: IonContent;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  @ViewChild('tab', { static: true }) tab: Tab;
  @ViewChildren(DrawListTemplate) templates: QueryList<DrawListTemplate>;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private loadingService: LoadingService,
    private cookieService: CookieService,
  ) {

  }
  ngOnInit() {
    this.loadData(null, true);
  }
  async loadData(event = null, loading = false) {
    const pageSize = 20;
    let doLoadData = async () => {
      let currentCategory = this.categories[this.activeIndex];
      let res: LinkDrawResultList;
      if (this.biz) {//rank list case
        res = await this.linkDrawApi.getRankList(this.pageNum[this.activeIndex], pageSize, this.biz[this.activeIndex], this.categories[this.activeIndex], Enum_RankType.week);
      }
      else {
        switch (currentCategory) {
          case Enum_DrawCategory.comic:
          case Enum_DrawCategory.illustration:
            res = await this.linkDrawApi.getDocs(this.pageNum[this.activeIndex], pageSize, currentCategory, "hot");
            break;
          case Enum_DrawCategory.cos:
          case Enum_DrawCategory.sifu:
            res = await this.linkDrawApi.getPhotos(this.pageNum[this.activeIndex], pageSize, currentCategory, "hot");
            break;
        }
      }
      this.pageNum[this.activeIndex]++;
      this.data[this.activeIndex] = this.data[this.activeIndex].concat(res.items);
      if (event)
        event.target.complete();
      if (this.pageNum[this.activeIndex] * pageSize >= res.total_count)
        this.disableScrollEvent = false;
    }

    if (loading) {
      await this.loadingService.presentWithAction('', doLoadData);
    }
    else {
      await doLoadData();
    }
  }

  async doRefresh(event) {
    this.pageNum[this.activeIndex] = 0;
    this.data[this.activeIndex].length = 0;
    await this.loadData(event)
    this.templates.toArray()[this.activeIndex].resetWaterfall();
  }

  async ionSlideWillChange(event) {
    this.activeIndex = await this.slides.getActiveIndex()
    if (!this.data[this.activeIndex].length) {
      this.loadData()
    }
  }

  ionSlideDrag(event) {
    if (!this.isMoving) {
      this.isMoving = true;
    }
    let el = <HTMLElement>event.target;
    let width = el.clientWidth;
    let xRect = el.children[0].children[this.activeIndex].getBoundingClientRect()["x"];
    this.movingPosition = -xRect / width;
  }

  ionSlideTouchEnd() {
    this.isMoving = false;
  }

  onTabChange(event) {
    this.activeIndex = event.index;
  }
}
