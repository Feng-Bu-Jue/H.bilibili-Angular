import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpClientWrapper } from './code/HttpClientWrapper';
import { IonicModule } from '@ionic/angular';
import { AppHeaderWidget } from './widgets/app-header/app-header';
import { DrawListTemplate } from './template/draw-list/draw-list';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    HttpClientWrapper,
    //{ provide: ErrorHandler, useClass: AppExceptionHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
