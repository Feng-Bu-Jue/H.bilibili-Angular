import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { PhotoListPageRoutingModule } from './photo-list.routing.module';
import { PhotoListPage } from './photo-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';


@NgModule({
  declarations: [
    PhotoListPage,
  ],
  entryComponents:[
    DrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    PhotoListPageRoutingModule,
    DrawListTemplateModule
  ],
  providers:[]
})
export class PhotoListPageModule { }
