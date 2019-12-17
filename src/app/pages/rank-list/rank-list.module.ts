import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RankListPage } from './rank-list';
import { RankListPageRoutingModule } from './rank-list.routing.module';
import { AppHeaderModule } from 'src/app/widgets/app-header/app-header.module';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';


@NgModule({
  declarations: [
    RankListPage
  ],
  entryComponents: [
    DrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    RankListPageRoutingModule,
    AppHeaderModule,
    DrawListTemplateModule
  ],
  providers: []
})
export class RankListPageModule { }
