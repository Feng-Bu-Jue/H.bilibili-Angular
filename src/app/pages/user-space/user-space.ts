import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { LoadingService } from 'src/app/services/loadingService';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { UserApi } from 'src/app/bilibiliApi/userApi';
import { IonContent } from '@ionic/angular';


@Component({
    selector: "page-user-space",
    templateUrl: './user-space.html',
    styleUrls: ['./user-space.scss'],
    animations: [
        trigger('user-info', [
            state('up', style({ 'height': '*', 'padding': '*', 'opacity': '1', 'visibility': 'visible' })),
            state('down', style({ 'height': '0px', 'padding': '0', 'opacity': '0', 'visibility': 'hidden' })),
            transition('* => down', animate(300)),
            transition('* => up', animate(300))
        ]),
    ]
})
export class UserSpacePage implements OnInit {
    public uid: number;
    public pageNum: number = 0;
    public data;
    public userInfo;
    public disableScrollEvent: boolean = false;
    public scrollState;
    @ViewChild('ionContent', { static: false }) content: IonContent;

    public get scorllHeight() {
        let height = this.content && this.content["el"] ? this.content["el"].clientHeight : 0;
        return height + 'px';
    }

    public slideOpts = {
        initialSlide: 0,
        speed: 400
    };

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

    public onScroll(event) {
        if (event.target.direction != this.scrollState) {
            this.scrollState = event.target.direction;
            this.ref.detectChanges();
        }
    }
}
