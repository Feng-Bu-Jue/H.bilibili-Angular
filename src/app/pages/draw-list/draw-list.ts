import { Component, OnInit } from '@angular/core';
import { TabEvent } from '../../Components/Tab/tab.item.component';
import { Router } from '@angular/router';
import { LinkDrawApi } from 'src/app/bilibiliApi/LinkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/LinkDrawResult';


@Component({
  selector: "page-draw-list",
  templateUrl: './draw-list.html',
  styleUrls: ['./draw-list.scss']
})
export class DrawListPage implements OnInit {
  public data: LinkDrawResult[];
  public newdocs: LinkDrawResult[];

  public currentNum = 0;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  public get height() {
    return `${screen.height - 86}px`;
  }
  constructor(private linkDrawApi: LinkDrawApi) { }

  ngOnInit(): void {
    this.linkDrawApi.getDocList(this.currentNum, 20, "all", "hot")
      .subscribe((res) => {
        this.data = res;
    });
    this.linkDrawApi.getDocList(0, 20, "all", "new")
      .subscribe((res) => {
        this.newdocs = res;
    });
  }

  onscrollLower(category: string) {
    if (category == 'hot') {
      this.currentNum += 1;
      this.linkDrawApi.getDocList(this.currentNum, 20, "all", "hot")
        .subscribe((res) => {
          this.data = this.data.concat(res);
        });
    }
  }

}
