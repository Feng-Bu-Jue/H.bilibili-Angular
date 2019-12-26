import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DrawListTemplate } from 'src/app/template/draw-list/draw-list';
import { ComponentModule } from 'src/app/components/componetModule';
import { DrawListTemplateModule } from 'src/app/template/draw-list/draw-list.module';
import { WidgetModule } from 'src/app/widgets/widget.module';
import { TabDrawListTemplate } from './tab-draw-list';


@NgModule({
  declarations: [
    TabDrawListTemplate,
  ],
  entryComponents: [
    DrawListTemplate
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    DrawListTemplateModule,
    WidgetModule
  ],
  exports: [
    TabDrawListTemplate
  ]
})
export class TabDrawListTemplateModule { }
