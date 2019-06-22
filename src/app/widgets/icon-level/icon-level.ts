import { Component, OnInit, ElementRef, Input, HostBinding } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'icon-level',
    template: `
    <div class="level-tag" [attr.lvl]="level">
        LV{{level}}
    </div>
    `,
    styleUrls: ['./icon-level.scss']
})
export class IconLevel implements OnInit {
    @Input()
    level: number;

    ngOnInit(): void {

    }

}
