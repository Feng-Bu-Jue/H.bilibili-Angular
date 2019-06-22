import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { Tab } from 'src/app/Components/tab/tab.component';
import { TabItem } from 'src/app/Components/tab/tab.item.component';
import { Scroll } from './scroll/scroll.component';
import { Swiper } from './swiper/swiper.component';
import { SwiperItem } from './swiper/swiper.item.component';
import { TapRipple } from './tapDirective/tapRipple';


@NgModule({
    declarations: [
        Scroll,
        Swiper,
        SwiperItem,
        Tab,
        TabItem,
        TapRipple
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
        TapRipple
    ]
})
export class ComponentModule { }
