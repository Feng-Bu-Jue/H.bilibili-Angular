import { Component, OnInit, Input } from '@angular/core';
import { TabEvent } from '../../Components/Tab/tab.item.component';
import { Router } from '@angular/router';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
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