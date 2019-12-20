import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';
import { UserSpacePageRoutingModule } from './user-space.routing';
import { UserSpacePage } from './user-space';

@NgModule({
  declarations: [
    UserSpacePage,
  ],
  entryComponents: [
    DrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    UserSpacePageRoutingModule,
    DrawListTemplateModule
  ],
  providers: []
})
export class UserSpacePageModule { }
