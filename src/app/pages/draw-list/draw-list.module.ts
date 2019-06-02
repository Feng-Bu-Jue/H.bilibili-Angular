import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DrawListPage } from './draw-list';
import { DrawListPageRoutingModule } from './draw-list.routing.module';
import { IImageLoaderOptions } from 'ngx-progressive-image-loader';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { SwiperItem } from 'src/app/components/swiper/swiper.item.component';
import { Swiper } from 'src/app/components/swiper/swiper.component';
import { AppHeaderWidget } from 'src/app/widgets/app-header/app-header';
import { AppTabsWidgetModule } from 'src/app/widgets/app-tabs/app-tabs.module';
import { AppHeaderWidgetModule } from 'src/app/widgets/app-header/app-header.module';
import { LinkDrawApi } from 'src/app/bilibiliApi/linkDrawApi';
import { Scroll } from 'src/app/components/scroll/scroll.component';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';
import { UserApi } from 'src/app/bilibiliApi/userApi';


@NgModule({
  declarations: [
    DrawListPage
  ],
  entryComponents:[
    DrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    DrawListPageRoutingModule,
    AppTabsWidgetModule,
    AppHeaderWidgetModule,
    DrawListTemplateModule
  ],
  providers:[LinkDrawApi,UserApi]
})
export class DrawListPageModule { }
