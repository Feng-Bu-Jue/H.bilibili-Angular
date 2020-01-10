import { Component, OnInit, ElementRef, ViewChild, DoCheck, Inject, AfterContentInit, AfterViewInit } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { DatePipe } from '@angular/common';
import { ReplyApi } from 'src/app/bilibiliApi/replyApi';
import { Reply, ReplyPage } from 'src/app/bilibiliApi/models/replyResult';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/LinkDrawResult';
import { ModalController, IonInfiniteScroll, ActionSheetController, PopoverController } from '@ionic/angular';
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
export class DrawDetailPage implements OnInit, AfterViewInit, DoCheck {

  public util = util;

  public detailResult: LinkDrawResult;
  public replies: Array<Reply> = new Array<Reply>();
  public replyPage: ReplyPage;

  public commentMessage: string;

  public pageNum = 1;
  public uid: number;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(
    public linkDrawApi: LinkDrawApi,
    public replyApi: ReplyApi,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public router: Router,
    public modalService: ModalService,
    public toastervice: ToastService,
    public authService: AuthService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
  ) {
    this.uid = Number(this.route.snapshot.paramMap.get('uid'));
  }

  async ngOnInit(): Promise<void> {
    let res = await this.linkDrawApi.getDocDetail(this.uid)
    this.detailResult = res;

  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadMoreComment();
  }

  public ngDoCheck(): void {

  }

  public async loadMoreComment(event = null): Promise<void> {
    await this.replyApi.getReplies(this.uid, this.pageNum)
      .then(res => {
        this.pageNum++;
        this.replyPage = res.page;
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
    let modal = await this.modalController.create(this.modalService.fromDefaultOption({
      component: ImgViewer,
      componentProps: {
        urls: this.detailResult.item.pictures.map(x => x.img_src),
        currentIndex: index,
      }
    }))
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

  public async presentCommentSheet() {
    const popover = await this.popoverController.create({
      component: Comment,
      translucent: true
    });
    return await popover.present();
  }
}

