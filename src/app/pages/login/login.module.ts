import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/components/componetModule';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login.routing.module';
import { WidgetModule } from 'src/app/widgets/widget.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    FormsModule,
    LoginPageRoutingModule,
    WidgetModule
  ],
  providers: []
})
export class LoginPageModule { }
