import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { PhotoListPageRoutingModule } from './photo-list.routing.module';
import { PhotoListPage } from './photo-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';
import { TabDrawListTemplate } from 'src/app/template/tab-draw-list/tab-draw-list';
import { TabDrawListTemplateModule } from 'src/app/template/tab-draw-list/tab-draw-list.module';


@NgModule({
  declarations: [
    PhotoListPage,
  ],
  entryComponents: [
    TabDrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    PhotoListPageRoutingModule,
    TabDrawListTemplateModule
  ],
  providers: []
})
export class PhotoListPageModule { }
