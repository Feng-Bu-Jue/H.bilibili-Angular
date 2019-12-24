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
  selector: "page-photo-list",
  templateUrl: './photo-list.html',
  styleUrls: ['./photo-list.scss']
})
export class PhotoListPage implements OnInit {
  @ViewChild('ionContent') content: IonContent;

  public get scorllHeight() {
    let height = this.content["el"].clientHeight;
    return height + 'px';
  }

  public readonly tabTitle = ['cos', '私服']

  public readonly categories: Array<Enum_DrawCategory> =
    new Array<Enum_DrawCategory>(
      Enum_DrawCategory.cos,
      Enum_DrawCategory.sifu)

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
    zoom: false
  };

  @ViewChild('slides') slides: IonSlides;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadData(null, true);
  }

  async loadData(event = null, loading = false) {
    let doLoadData = async () => {
      let res = await this.linkDrawApi.getPhotos(this.pageNum[this.activeIndex], 20, this.categories[this.activeIndex], "hot");
      this.pageNum[this.activeIndex]++;
      this.data[this.activeIndex] = this.data[this.activeIndex].concat(res);

      if (event)
        event.target.complete();

      if (this.pageNum[this.activeIndex] >= 25)
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
