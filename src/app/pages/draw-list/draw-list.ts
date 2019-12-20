import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll, IonSlide, IonSlides, IonContent } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { Enum_DrawCategory } from 'src/app/bilibiliApi/models/Enum';
import { LoadingService } from 'src/app/services/loadingService';
import { async } from '@angular/core/testing';


@Component({
  selector: "page-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListPage implements OnInit, AfterViewChecked {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(DrawListTemplate) template: DrawListTemplate;
  @ViewChild('ionContent') content: IonContent;

  public get scorllHeight() {
    let height = this.content["el"].clientHeight;
    return height + 'px';
  }

  public readonly tabTitle = ['插画', '漫画']

  public readonly categories: Array<Enum_DrawCategory> =
    new Array<Enum_DrawCategory>(
      Enum_DrawCategory.illustration,
      Enum_DrawCategory.comic)

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
  protected sourceRefresh: boolean;

  public slideOpts = {
    initialSlide: this.activeIndex,
    speed: 400
  };

  @ViewChild('slides') slides: IonSlides;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadData(null, true);
  }
  ngAfterViewChecked(): void {
    if (this.sourceRefresh) {
      this.template.resetWaterfall();
      this.sourceRefresh = false;
    }
  }
  async loadData(event = null, loading = false) {
    let doLoadData = async () => {
      let res = await this.linkDrawApi.getDocs(this.pageNum[this.activeIndex], 20, this.categories[this.activeIndex], "hot");
      this.pageNum[this.activeIndex]++;
      this.data[this.activeIndex] = this.data[this.activeIndex].concat(res);
      if (event)
        event.target.complete();

      if (this.pageNum[this.activeIndex] >= 100)
        this.infiniteScroll.disabled = true;
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
    await this.loadData(event)
  }
  async ionSlideDidChange() {
    this.activeIndex = await this.slides.getActiveIndex();
    if (!this.data[this.activeIndex].length) {
      this.loadData()
    }
  }
  onTabChange(event) {
    this.activeIndex = event.index;
  }
}
