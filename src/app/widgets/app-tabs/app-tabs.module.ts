import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AppTabsWidget } from './app-tabs';
import { Tab } from 'src/app/components/tab/tab.component';
import { TabItem } from 'src/app/components/tab/tab.item.component';
import { ComponentModule } from 'src/app/components/componetModule';



@NgModule({
    declarations: [
        AppTabsWidget
    ],
    imports: [
        CommonModule,
        ComponentModule,
        IonicModule
    ],
    exports: [
        AppTabsWidget
    ]
})
export class AppTabsWidgetModule { }
