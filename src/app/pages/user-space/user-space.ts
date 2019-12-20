import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LinkDrawResult } from 'src/app/bilibiliApi/models/linkDrawResult';
import { IonInfiniteScroll, IonSlide, IonSlides, IonContent } from '@ionic/angular';
import { NgxWaterfallComponent } from 'ngx-waterfall';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { Enum_DrawCategory, Enum_Biz, Enum_RankType } from 'src/app/bilibiliApi/models/Enum';
import { LoadingService } from 'src/app/services/loadingService';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: "page-user-space",
    templateUrl: './user-space.html',
    styleUrls: ['./user-space.scss']
})
export class UserSpacePage implements OnInit {
    public uid: number;
    public pageNum: number = 0;
    public data={};
    @ViewChild('ionContent') content: IonContent;

    public get scorllHeight() {
        let height = this.content["el"].clientHeight;
        return height + 'px';
    }

    public slideOpts = {
        initialSlide: 0,
        speed: 400
      };

    constructor(
        private linkDrawApi: LinkDrawApi,
        private loadingService: LoadingService,
        private route: ActivatedRoute
    ) {
        this.uid = Number(this.route.snapshot.paramMap.get('uid'));
    }

    async ngOnInit() {
        await this.loadData(null);
    }
    async loadData(event) {
        let res = await this.linkDrawApi.getOthers(this.uid, this.pageNum, 20);
        this.pageNum++;
        this.data = res;
        
        if (event)
            event.target.complete();
    }
}
