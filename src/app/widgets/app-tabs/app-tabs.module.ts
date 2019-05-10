import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AppTabsWidget } from './app-tabs';
import { Tab } from 'src/app/Components/Tab/tab.component';
import { TabItem } from 'src/app/Components/Tab/tab.item.component';



@NgModule({
    declarations: [
        Tab,
        TabItem,
        AppTabsWidget
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        AppTabsWidget
    ]
})
export class AppTabsWidgetModule { }
