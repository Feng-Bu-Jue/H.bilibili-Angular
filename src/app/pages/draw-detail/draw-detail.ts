import { Component, OnInit, ElementRef, QueryList, ContentChildren, ContentChild, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { TabEvent } from '../../Components/Tab/tab.item.component';

import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { DatePipe } from '@angular/common';
import { ReplyApi } from 'src/app/bilibiliApi/replyApi';
import { ReplyResult } from 'src/app/bilibiliApi/models/reply';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/LinkDrawResult';
import { PopoverController, ModalController, IonContent } from '@ionic/angular';
import { viewImg } from '../../widgets/app-view-img/app-view-img';
import { promise } from 'selenium-webdriver';
import { AnimationBuilder, Animation } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: "page-draw-detail",
  templateUrl: './draw-detail.html',
  styleUrls: ['./draw-detail.scss']
})
export class DrawDetailPage implements OnInit {
  public detailResult: LinkDrawResult;
  public replyResult: ReplyResult;

  public contentSscrollAtBottom: boolean = false;

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

    this.replyApi.getReplies(uid).subscribe(res => {
      this.replyResult = res;
    });
  }

  public getImgItemW(count: number): string {
    let wClass: string;
    let wClassMap: { [name: string]: () => boolean } =
    {
      "w-1": () => {
        return count == 1;
      },
      "w-2": () => {
        return count == 2 || count == 4;
      },
      "w-3": () => {
        return true;
      }
    }
    Object.keys(wClassMap).every((key, index) => {
      if (wClassMap[key]()) {
        wClass = key;
        return false;
      }
      return true;
    })
    return wClass;
  }

  public async goImgView(index: number): Promise<void> {
    const popover = await this.modalController.create({
      component: viewImg,
      componentProps: {
        urls: this.detailResult.item.pictures.map(x => x.img_src),
        currentIndex: index
      },
      //logic need to migrate 
      enterAnimation: async (animation: Animation, baseEl: HTMLElement, opts: any) => {
        const baseAnimation = new animation();

        const backdropAnimation = new animation();
        backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

        const wrapperAnimation = new animation();
        wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

        wrapperAnimation
          .fromTo('opacity', 0.01, 1)
          .duration(280)
          .fromTo('translateY', '40px', '0px')
          .duration(0);

        backdropAnimation.fromTo('opacity', 0.01, 0.32);

        return baseAnimation
          .addElement(baseEl)
          .easing('cubic-bezier(0.36,0.66,0.04,1)')
          .duration(280)
          .beforeAddClass('show-modal')
          .add(backdropAnimation)
          .add(wrapperAnimation);
      },
      leaveAnimation: async (animation: Animation, baseEl: HTMLElement, opts: any) => {
        const baseAnimation = new animation();

        const backdropAnimation = new animation();
        backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

        const wrapperAnimation = new animation();
        wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

        wrapperAnimation
          .fromTo('opacity', 0.99, 0)
          .duration(280)
          .fromTo('translateY', '0px', '40px')
          .duration(0);

        backdropAnimation.fromTo('opacity', 0.32, 0);

        return baseAnimation
          .addElement(baseEl)
          .easing('cubic-bezier(0.36,0.66,0.04,1)')
          .duration(280)
          .beforeAddClass('show-modal')
          .add(backdropAnimation)
          .add(wrapperAnimation);
      },
    });
    await popover.present();
  }
}

