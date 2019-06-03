import { Component, OnInit, Input } from '@angular/core';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';


@Component({
  selector: "template-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListTemplate implements OnInit {

  @Input("data")
  public data: LinkDrawResult[];

  async ngOnInit() {
   
  }
}
