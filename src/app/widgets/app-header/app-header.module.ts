import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AppHeader } from './app-header';



@NgModule({
    declarations: [
        AppHeader
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        AppHeader
    ]
})
export class AppHeaderModule { }
