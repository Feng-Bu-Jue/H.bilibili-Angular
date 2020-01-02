import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonBackButton } from '@ionic/angular';


@Component({
    selector: 'app-header',
    template: `
    <ion-header>
        <ion-toolbar class="toolbar" color="primary">
            <ion-buttons slot="start">
                <ion-back-button #backButton (click)="goBack()" defaultHref=""></ion-back-button>
            </ion-buttons>
            <div class="title" [ngStyle]="{'transform': 'translateX('+titleOffsetX+'px)'}">{{title}}</div>
        </ion-toolbar>
        <ng-content></ng-content>
    </ion-header>`,
    styleUrls: ['./app-header.scss']
})
export class AppHeader implements OnInit {
    @Input()
    public title: string;
    @Input()
    public showBack: boolean = true;

    @ViewChild('backButton', { static: true }) backButton: IonBackButton;

    get titleOffsetX() {
        let width = this.backButton ? this.backButton["el"].clientWidth : 0;
        return -width / 2;
    }

    constructor(
        //private router: Router,
    ) { }

    ngOnInit(): void {

    }

    public goBack(): void {
        if (history.length == 1) {
            //this.router.navigate(['']);//go to default page
        } else {
            history.back();
        }
    }
}
