import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RankListPageRoutingModule } from './rank-list.routing.module';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';
import { TabDrawListTemplateModule } from 'src/app/template/tab-draw-list/tab-draw-list.module';
import { TabDrawListTemplate } from 'src/app/template/tab-draw-list/tab-draw-list';
import { RankListPage } from './rank-list';


@NgModule({
  declarations: [
    RankListPage,
  ],
  entryComponents: [
    TabDrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    RankListPageRoutingModule,
    TabDrawListTemplateModule,
  ],
  providers: []
})
export class RankListPageModule { }
