import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/components/componetModule';
import { IonicModule } from '@ionic/angular';
import { MePage } from './me';
import { NgModule } from '@angular/core';
import { MePageRoutingModule } from './me.routing.module';
import { WidgetModule } from 'src/app/widgets/widget.module';
import { MeFavoritesPageModule } from './me-favorites/me-favorites.module';


@NgModule({
  declarations: [
    MePage,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    MePageRoutingModule,
    MeFavoritesPageModule,
    WidgetModule
  ],
  providers: [],
})
export class MePageModule { }
