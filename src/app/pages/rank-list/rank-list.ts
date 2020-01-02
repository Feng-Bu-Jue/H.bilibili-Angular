import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, ViewChildren, QueryList } from '@angular/core';
import { TabDrawListTemplate } from 'src/app/template/tab-draw-list/tab-draw-list';
import { Enum_DrawCategory, Enum_Biz } from 'src/app/bilibiliApi/models/Enum';


@Component({
  selector: "page-rank-list",
  templateUrl: './rank-list.html',
  styleUrls: ['./rank-list.scss']
})
export class RankListPage implements OnInit {

  public readonly tabTitle = ['画友', '摄影']
  public readonly biz: Array<Enum_Biz> = [Enum_Biz.draw, Enum_Biz.photo]
  public readonly categories: Array<Enum_DrawCategory> =
    new Array<Enum_DrawCategory>(
      Enum_DrawCategory.illustration,
      Enum_DrawCategory.sifu)

  ngOnInit(): void {

  }

}
