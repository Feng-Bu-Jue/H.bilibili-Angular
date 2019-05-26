import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page.module.routing';
import { DrawListPageModule } from '../draw-list/draw-list.module';
import { PhotoListPageModule } from '../photo-list/photo-list.module';
import { DrawDetailPageModule } from '../draw-detail/draw-detail.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabsPageRoutingModule,
    DrawListPageModule,
    PhotoListPageModule,
    DrawDetailPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
