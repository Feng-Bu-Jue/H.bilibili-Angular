import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: "view-img",
  templateUrl: './app-view-img.html',
  styleUrls: ['./app-view-img.scss']
})
export class viewImg implements OnInit {

  @Input()
  urls: Array<string>;
  @Input()
  currentIndex: number = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit(): void {
    this.slideOpts.initialSlide = this.currentIndex;
  }

  constructor(
    public modalController: ModalController
  ) { }

  contentClick(): void {
    this.modalController.dismiss();
  }

  slideClick(evetn: Event): void {
    evetn.stopPropagation();
  }
}
