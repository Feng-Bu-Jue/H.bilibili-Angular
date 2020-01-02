import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'act-box',
    template: `
    <ng-content></ng-content>
    <ion-ripple-effect></ion-ripple-effect>
    `,
    styleUrls: ['./activatable.scss']
})
export class Activatable implements OnInit {
    @HostBinding('class.ion-activatable')
    ionActivatable=true;

    constructor(
       
    ) { }

    ngOnInit(): void {

    }
}
