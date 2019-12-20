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
import { ModalService } from 'src/app/services/modalService';

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

  public pageNum = 1;
  public uid: number;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private replyApi: ReplyApi,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public router: Router,
    public modalService: ModalService,
    public toastervice: ToastService,
    public authService: AuthService,
    private modalController: ModalController
  ) {
    this.uid = Number(this.route.snapshot.paramMap.get('uid'));
  }

  async ngOnInit(): Promise<void> {
    let res = await this.linkDrawApi.getDocDetail(this.uid)
    this.detailResult = res;
    this.loadMoreComment();
  }

  public ngDoCheck(): void {
    this.commnentButtonDisabled = !(this.commentMessage && this.commentMessage.length > 0);
  }

  public async loadMoreComment(event = null): Promise<void> {
    await this.replyApi.getReplies(this.uid, this.pageNum)
      .then(res => {
        this.pageNum++;
        this.replyPageInfo = res.page;//update count for each call
        if (res.replies) {
          this.replies = this.replies.concat(res.replies);
        }

        if (res.page.count < res.page.size || this.pageNum > Math.ceil(res.page.count / res.page.size)) {
          this.infiniteScroll.disabled = true;
        }
        if (event)
          event.target.complete();
      })
  }

  public async popUpImgViewer(index: number): Promise<void> {
    var options = this.modalService.fromDefaultOtion({
      component: ImgViewer,
      componentProps: {
        urls: this.detailResult.item.pictures.map(x => x.img_src),
        currentIndex: index,
      }
    })
    let modal = await this.modalController.create(options)
    await modal.present();
  }

  public comment(message: string) {
    this.replyApi.add(this.uid, message, 0, 0).then(
      (res) => {
        this.toastervice.present("comment successful");
        this.commentMessage = null;
      },
      (error) => {
        this.toastervice.present(error.message)
      });
  }
}

