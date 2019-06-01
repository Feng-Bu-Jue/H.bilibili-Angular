import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { Tab } from 'src/app/components/tab/tab.component';
import { TabItem } from 'src/app/components/tab/tab.item.component';
import { Scroll } from './scroll/scroll.component';
import { Swiper } from './swiper/swiper.component';
import { SwiperItem } from './swiper/swiper.item.component';
import { IonContentEx } from './ion-content-ex/ion-content-ex.component';



@NgModule({
    declarations: [
        Scroll,
        Swiper,
        SwiperItem,
        Tab,
        TabItem,
        IonContentEx
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        Scroll,
        Swiper,
        SwiperItem,
        Tab,
        TabItem,
        IonContentEx
    ]
})
export class ComponentModule { }
