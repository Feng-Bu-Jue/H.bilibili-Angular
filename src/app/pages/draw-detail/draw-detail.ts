import { Component, OnInit, ElementRef, QueryList, ContentChildren, ContentChild, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';

import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { DatePipe } from '@angular/common';
import { ReplyApi } from 'src/app/bilibiliApi/replyApi';
import { ReplyResult, Reply } from 'src/app/bilibiliApi/models/reply';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { PopoverController, ModalController, IonContent, IonInfiniteScroll } from '@ionic/angular';
import { ImgViewer } from '../../widgets/img-viewer/img-viewer';
import { promise } from 'selenium-webdriver';
import { AnimationBuilder, Animation } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import * as util from "./util";

@Component({
  selector: "page-draw-detail",
  templateUrl: './draw-detail.html',
  styleUrls: ['./draw-detail.scss']
})
export class DrawDetailPage implements OnInit {
  public util = util;

  public detailResult: LinkDrawResult;
  public replies: Array<Reply> = new Array<Reply>();
  public repliesCount: number = 0;

  public contentSscrollAtBottom: boolean = false;
  public commentPageNum = 1;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private replyApi: ReplyApi,
    private el: ElementRef,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public modalController: ModalController
  ) { }

  async ngOnInit(): Promise<void> {
    const uid = Number(this.route.snapshot.paramMap.get('uid'));
    this.linkDrawApi.getDocDetail(uid).subscribe(async res => {
      this.detailResult = res;
    });

    this.loadMoreComment();
  }

  public loadMoreComment(event = null): void {
    const uid = Number(this.route.snapshot.paramMap.get('uid'));
    this.replyApi.getReplies(uid, this.commentPageNum)
      .subscribe(res => {
        this.commentPageNum++;
        this.replies = this.replies.concat(res.replies);
        if (event)
          event.target.complete();
        if (this.commentPageNum >= Math.ceil(res.page.count / res.page.size))
          this.infiniteScroll.disabled = true;
      })
  }

  public async popUpImgView(index: number): Promise<void> {
    const popover = await this.modalController.create({
      component: ImgViewer,
      componentProps: {
        urls: this.detailResult.item.pictures.map(x => x.img_src),
        currentIndex: index
      },
      //logic need to migrate 
      enterAnimation: util.imgViewEnterAnimation,
      leaveAnimation: util.imgViewLeaveAnimation
    });
    await popover.present();
  }
}

