import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpClientWrapper } from './code/httpClientWrapper';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    HttpClientWrapper,
    File
    //{ provide: ErrorHandler, useClass: AppExceptionHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
