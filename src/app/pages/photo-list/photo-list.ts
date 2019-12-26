import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll, IonSlide, IonSlides, IonContent } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { Enum_DrawCategory } from 'src/app/bilibiliApi/models/Enum';
import { LoadingService } from 'src/app/services/loadingService';
import { async } from '@angular/core/testing';

@Component({
  selector: "page-photo-list",
  templateUrl: './photo-list.html',
  styleUrls: ['./photo-list.scss']
})
export class PhotoListPage implements OnInit {

  public readonly tabTitle = ['cos', '私服']
  public readonly categories: Array<Enum_DrawCategory> =
    new Array<Enum_DrawCategory>(
      Enum_DrawCategory.cos,
      Enum_DrawCategory.sifu)

  ngOnInit(): void {
    
  }

}
