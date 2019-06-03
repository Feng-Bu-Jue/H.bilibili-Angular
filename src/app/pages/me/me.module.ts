import { UserApi } from 'src/app/bilibiliApi/userApi';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/components/componetModule';
import { IonicModule } from '@ionic/angular';
import { MePage } from './me';
import { NgModule } from '@angular/core';
import { MePageRoutingModule } from './me.routing.module';

@NgModule({
  declarations: [
    MePage
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    MePageRoutingModule
  ],
  providers: []
})
export class MePageModule { }
