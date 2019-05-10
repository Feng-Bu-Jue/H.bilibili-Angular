import { Component, OnInit } from '@angular/core';
import { TabEvent } from '../../Components/Tab/tab.item.component';
import { Router } from '@angular/router';
import { LinkDrawApi } from 'src/app/bilibiliApi/LinkDrawApi';
import { DocResult } from 'src/app/bilibiliApi/Models/DocResult';


@Component({
  selector:"pase-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListPage implements OnInit {

  public data: DocResult[];
  
  public get height()
  {
    return  `${screen.height - 86}px`;
  }
  constructor(private linkDrawApi: LinkDrawApi) { }

  ngOnInit(): void {
    this.linkDrawApi.getDocList(0, 20, "all", "hot")
      .subscribe((res) => {
        this.data = res;
      });
  }
}
