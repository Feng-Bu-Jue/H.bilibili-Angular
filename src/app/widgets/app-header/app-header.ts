import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-header',
    template: `
    <ion-header>
        <ion-toolbar class="toolbar" color="primary">
            <div (click)="goBack()" class="back-btn" *ngIf="showBack">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </div>
            <div class="title">{{title}}</div>
            <ng-content></ng-content>
        </ion-toolbar>
    </ion-header>`,
    styleUrls: ['./app-header.scss']
})
export class AppHeader implements OnInit {
    @Input()
    public title: string;
    @Input()
    public showBack: boolean = true;

    constructor(
        //private router: Router,
    ) { }

    ngOnInit(): void {
        console.log(this.showBack)
    }

    public goBack(): void {
        if (history.length == 1) {
            //this.router.navigate(['']);//go to default page
        } else {
            history.back();
        }
    }
}
