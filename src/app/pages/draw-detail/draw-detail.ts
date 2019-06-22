import { Component, OnInit, ElementRef, ViewChild, DoCheck, Inject } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { DatePipe } from '@angular/common';
import { ReplyApi } from 'src/app/bilibiliApi/replyApi';
import { Reply, ReplyPage } from 'src/app/bilibiliApi/models/replyResult';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/LinkDrawResult';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { ImgViewer } from '../../widgets/img-viewer/img-viewer';
import { ActivatedRoute, Router } from '@angular/router';
import * as util from "./util";
import { ToastService } from 'src/app/services/toastService';
import { AuthService } from 'src/app/services/authService';
import { Foo, AnnotationReflector } from 'src/app/decoratorTest';
import { inject } from '@angular/core/testing';

@Component({
  selector: "page-draw-detail",
  templateUrl: './draw-detail.html',
  styleUrls: ['./draw-detail.scss']
})
export class DrawDetailPage implements OnInit, DoCheck {
  public util = util;

  public detailResult: LinkDrawResult;
  public replies: Array<Reply> = new Array<Reply>();
  public replyPageInfo: ReplyPage;

  public commentMessage: string;
  public commnentButtonDisabled: boolean = true;

  public commentPageNum = 1;
  public uid :number;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private replyApi: ReplyApi,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public router: Router,
    public modalController: ModalController,
    public toastervice: ToastService,
    public authService: AuthService,
  ) {
    this.uid=Number(this.route.snapshot.paramMap.get('uid'));
  }

  async ngOnInit(): Promise<void> {
    this.linkDrawApi.getDocDetail(this.uid).subscribe(async res => {
      this.detailResult = res;
    });

    this.loadMoreComment();
  }

  public ngDoCheck(): void {
    this.commnentButtonDisabled = !(this.commentMessage && this.commentMessage.length > 0);
  }

  public loadMoreComment(event = null): void {
    this.replyApi.getReplies(this.uid, this.commentPageNum)
      .subscribe(res => {
        this.commentPageNum++;
        this.replyPageInfo = res.page;//update count for each call
        this.replies = this.replies.concat(res.replies);

        if (event)
          event.target.complete();
        if (this.commentPageNum > Math.ceil(res.page.count / res.page.size))
          this.infiniteScroll.disabled = true;
      })
  }

  public async popUpImgViewer(index: number): Promise<void> {
    const popover = await this.modalController.create({
      component: ImgViewer,
      componentProps: {
        urls: this.detailResult.item.pictures.map(x => x.img_src),
        currentIndex: index,
      },
      backdropDismiss: true,
      enterAnimation: util.imgViewEnterAnimation,
      leaveAnimation: util.imgViewLeaveAnimation
    });
    await popover.present();
  }

  public comment(message: string) {
    this.replyApi.add(this.uid, message, 0, 0).subscribe(
      (res) => {
        this.toastervice.present("comment successful");
        this.commentMessage = null;
      },
      (error) => {
        this.toastervice.present(error.message)
      });
  }
}

