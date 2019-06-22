import { Component, OnInit, Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { ToastController } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';

@Component({
  selector: "template-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListTemplate implements OnInit {

  @Input("data")
  public data: LinkDrawResult[];

  @ViewChild(NgxWaterfallComponent) waterfall: NgxWaterfallComponent;

  private gap: number = 20;
  private clumn = 2;
  private get itemWidth() {
    let containerWidth = this.waterfall.waterfallContainerElement.nativeElement.clientWidth;
    return this.clacItemWidth(containerWidth);
  }

  constructor(
    private linkDrawApi: LinkDrawApi,
    private toastController: ToastController,
  ) { }

  async ngOnInit() {

  }

  private clacItemWidth(containerWidth: number) {
    return (containerWidth - this.gap) / 2;
  }

  public resetWaterfall() {
    this.waterfall.reset();
  }

  vote(docId: number, actionType: number) {
    actionType = actionType ? 1 : 0;
    this.linkDrawApi.vote(docId, actionType).subscribe(
      async (res) => {
        if (res) {
          //find it and update vote status
          this.data.find(x => x.item.doc_id == docId).item.already_voted = actionType;
          const toast = await this.toastController.create({
            message: "点赞成功",
            position: 'bottom',
            duration: 1500
          });
          toast.present();
        }
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: error.message,
          position: 'bottom',
          duration: 1500
        });
        toast.present();
      });
  }
}
