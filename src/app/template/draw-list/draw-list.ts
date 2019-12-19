import { Component, OnInit, Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { ToastController } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: "template-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListTemplate implements OnInit {

  @Input("data")
  public data: LinkDrawResult[];

  @ViewChild(NgxWaterfallComponent) waterfall: NgxWaterfallComponent;

  private gap: number = 10;
  private clumn = 2;
  private get itemWidth() {
    let containerWidth = this.waterfall.waterfallContainerElement.nativeElement.clientWidth;
    return this.clacItemWidth(containerWidth);
  }

  constructor(
    private linkDrawApi: LinkDrawApi,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {

  }

  private clacItemWidth(containerWidth: number) {
    return (containerWidth - this.gap) / this.clumn;
  }

  public resetWaterfall() {
    this.waterfall.reset();
  }

  async vote(docId: number, actionType: number) {
    console.log("calling")
    actionType = actionType ? 1 : 0;
    await this.linkDrawApi.vote(docId, actionType)
      .then(async (res) => {
        this.data.find(x => x.item.doc_id == docId).item.already_voted = actionType;
        await this.toastService.present('点赞成功')
      });
  }
}
