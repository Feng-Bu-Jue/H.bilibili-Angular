import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'icon-gender',
    template: `
    <ng-container *ngIf="sex=='男'||sex=='女'">
        <svg class="icon item" aria-hidden="true" [ngClass]="{'gender-nan':sex=='男','gender-nv':sex=='女'}">
            <use [attr.xlink:href]="sex=='男'?'#icon-nan':'#icon-nv'"></use>
        </svg>
    </ng-container>
    `,
    styleUrls: ['./icon-gender.scss']
})
export class IconGender implements OnInit {
    @Input()
    sex: string;

    ngOnInit(): void {

    }

}
