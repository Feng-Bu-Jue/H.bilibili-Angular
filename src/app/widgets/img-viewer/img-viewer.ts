import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { DownloadService } from 'src/app/services/dowloadservice';


@Component({
  selector: "img-viewer",
  templateUrl: './img-viewer.html',
  styleUrls: ['./img-viewer.scss']
})
export class ImgViewer implements OnInit {

  @Input()
  urls: Array<string>;
  @Input()
  currentIndex: number = 0;
  /*
    slidesOpts = {
      initialSlide: 0,
      on: {
        beforeInit() {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          swiper.params = Object.assign(swiper.params, overwriteParams);
          swiper.params = Object.assign(swiper.originalParams, overwriteParams);
        },
        setTranslate() {
          const swiper = this;
          const { slides } = swiper;
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = swiper.slides.eq(i);
            const offset$$1 = $slideEl[0].swiperSlideOffset;
            let tx = -offset$$1;
            if (!swiper.params.virtualTranslate) tx -= swiper.translate;
            let ty = 0;
            if (!swiper.isHorizontal()) {
              ty = tx;
              tx = 0;
            }
            const slideOpacity = swiper.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
              : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
            $slideEl
              .css({
                opacity: slideOpacity,
              })
              .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
          }
        },
        setTransition(duration) {
          const swiper = this;
          const { slides, $wrapperEl } = swiper;
          slides.transition(duration);
          if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            slides.transitionEnd(() => {
              if (eventTriggered) return;
              if (!swiper || swiper.destroyed) return;
              eventTriggered = true;
              swiper.animating = false;
              const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
              for (let i = 0; i < triggerEvents.length; i += 1) {
                $wrapperEl.trigger(triggerEvents[i]);
              }
            });
          }
        },
      }
    }
  
    */
  slidesOpts = {
    initialSlide: 1,
    zoom: true,
    speed: 400
  };
  longPressTask = null;

  ngOnInit(): void {
    this.slidesOpts.initialSlide = this.currentIndex;
  }

  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private downloadService: DownloadService
  ) {

  }

  dismiss() {
    this.modalController.dismiss();
  }

  onTouchstart(url: string) {
    this.longPressTask = setTimeout(async () => {
      let options = {
        buttons: []
      }
      options.buttons.push({
        text: 'Download',
        handler: () => {
          this.downloadService.save(url);
        }
      })
      if (this.urls.length > 1) {
        options.buttons.push({
          text: 'Download All',
          handler: () => {
            this.downloadService.batchSave(this.urls);
          }
        })
      }
      options.buttons.push({
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      });
      const actionSheet = await this.actionSheetController.create(options);
      await actionSheet.present();
    }, 600)
  }

  onTouchend() {
    clearTimeout(this.longPressTask);
  }
}
