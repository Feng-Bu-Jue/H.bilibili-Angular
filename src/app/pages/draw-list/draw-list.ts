import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, ViewChildren, QueryList } from '@angular/core';
import { TabDrawListTemplate } from 'src/app/template/tab-draw-list/tab-draw-list';
import { Enum_DrawCategory } from 'src/app/bilibiliApi/models/Enum';


@Component({
  selector: "page-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListPage implements OnInit {

  public readonly tabTitle = ['插画', '漫画']
  public readonly categories: Array<Enum_DrawCategory> =
    new Array<Enum_DrawCategory>(
      Enum_DrawCategory.illustration,
      Enum_DrawCategory.comic)

  ngOnInit(): void {
    
  }

}
