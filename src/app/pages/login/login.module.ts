import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/components/componetModule';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login';
import { NgModule } from '@angular/core';
import { AppHeaderModule } from 'src/app/widgets/app-header/app-header.module';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login.routing.module';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    FormsModule,
    LoginPageRoutingModule,
    AppHeaderModule
  ],
  providers: []
})
export class LoginPageModule { }
