import { Component, OnInit } from '@angular/core';
import { TabEvent } from '../../Components/Tab/tab.item.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LinkDrawApi } from 'src/app/bilibiliApi/LinkDrawApi';
import { DocResult } from 'src/app/bilibiliApi/Models/DocResult';
import { DatePipe } from '@angular/common';


@Component({
  selector: "pase-draw-detail",
  templateUrl: './draw-detail.html',
  styleUrls: ['./draw-detail.scss']
})
export class DrawDetailPage implements OnInit {
  public data: DocResult;

  constructor(
    private linkDrawApi: LinkDrawApi,
    private route: ActivatedRoute,
    public datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.linkDrawApi.getDetail(uid).subscribe(res => {
      this.data = res;
    });
  }
}

