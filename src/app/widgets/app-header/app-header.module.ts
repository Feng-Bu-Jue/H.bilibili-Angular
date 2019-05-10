import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AppHeaderWidget } from './app-header';



@NgModule({
    declarations: [
        AppHeaderWidget
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        AppHeaderWidget
    ]
})
export class AppHeaderWidgetModule { }
