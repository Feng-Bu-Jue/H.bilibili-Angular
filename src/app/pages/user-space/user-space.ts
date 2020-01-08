import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LoadingService } from 'src/app/services/loadingService';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { UserApi } from 'src/app/bilibiliApi/userApi';
import { IonContent } from '@ionic/angular';
import { LinkDrawResultList } from 'src/app/bilibiliApi/models/linkDrawResult';
import { UesrInfoResult } from 'src/app/bilibiliApi/models/userInfoResult';


@Component({
    selector: "page-user-space",
    templateUrl: './user-space.html',
    styleUrls: ['./user-space.scss'],
    animations: [
        trigger('user-info', [
            transition('* => void', [
                style({ height: '*', padding: '*', opacity: '1', visibility: 'visible' }),
                animate("120ms", style({ height: 0, padding: 0, opacity: 0, visibility: 'hidden' }))]),
            transition('void => *', [
                style({ height: '0px', padding: '0px', opacity: '0', visibility: 'hidden' }),
                animate('120ms', style({ height: '*', padding: '*', opacity: 1, visibility: 'visible' }))])
        ]),
    ]
})
export class UserSpacePage implements OnInit {
    public uid: number;
    public pageNum: number = 0;
    public data: LinkDrawResultList;
    public userInfo: UesrInfoResult;
    public disableScrollEvent: boolean = false;
    public showUserDetail: boolean = true;
    @ViewChild('ionContent', { static: false }) content: IonContent;

    private scrollTop;

    public get scorllHeight() {
        let height = this.content && this.content["el"] ? this.content["el"].clientHeight : 0;
        return height + 'px';
    }

    constructor(
        private linkDrawApi: LinkDrawApi,
        private userApi: UserApi,
        private loadingService: LoadingService,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef
    ) {
        this.uid = Number(this.route.snapshot.paramMap.get('uid'));
    }

    async ngOnInit() {
        await Promise.all([this.loadUserData(), this.loadData(null)])
    }

    async loadUserData() {
        this.userInfo = await this.userApi.getSpaceInfo(this.uid);
    }

    async loadData(event) {
        let res = await this.linkDrawApi.getOthers(this.uid, this.pageNum, 20);
        this.pageNum++;
        if (this.data) {
            this.data.items = this.data.items.concat(res.items)
        }
        else {
            this.data = res;
        }
        if (event)
            event.target.complete();

        if (this.pageNum * 20 >= res.total_count)
            this.disableScrollEvent = true;
    }

    public async follow(isFollow: boolean) {
        let type = isFollow ? 1 : 0;
        await this.userApi.attention(this.uid, type);
        this.userInfo.is_followed = true;
    }


    public ionScroll(event) {
        this.showUserDetail = event.detail.deltaY < 0;
        console.log(event.detail.deltaY)
    }
}
