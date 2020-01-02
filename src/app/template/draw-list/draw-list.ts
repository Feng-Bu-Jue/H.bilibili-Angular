import { Component, OnInit, Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { ToastController } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { ToastService } from 'src/app/services/toastService';
import { DownloadService } from 'src/app/services/dowloadservice';

@Component({
  selector: "template-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListTemplate implements OnInit {
  @Input("data")
  public data;
  @Input("source")
  public source: string;

  @ViewChild(NgxWaterfallComponent, { static: true }) waterfall: NgxWaterfallComponent;

  public gap: number = 10;
  public clumn = 2;
  public get itemWidth() {
    let containerWidth = this.waterfall.waterfallContainerElement.nativeElement.clientWidth;
    return this.clacItemWidth(containerWidth);
  }

  constructor(
    private linkDrawApi: LinkDrawApi,
    private toastService: ToastService,
    private downloadService: DownloadService,
  ) { }

  async ngOnInit() {

  }
  
  public resetWaterfall() {
    this.waterfall.reset();
  }

  private clacItemWidth(containerWidth: number) {
    return (containerWidth - this.gap) / this.clumn;
  }

  public async vote(docId: number, already_voted: number): Promise<void> {
    if (already_voted == 0) {
      await this.linkDrawApi.vote(docId, 1);
      await this.linkDrawApi.favorite(docId, 2);
    }
    else {
      await this.linkDrawApi.vote(docId, 2);
      await this.linkDrawApi.unfvorite(docId, 2);
    }
    this.data.find(x => x.item.doc_id == docId).item.already_voted = already_voted == 0 ? 1 : 0;
    await this.toastService.present('点赞&收藏成功')
  }

  public async download(url: string) {
    await this.downloadService.save(url);
  }
}
