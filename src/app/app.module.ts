import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpClientWrapper } from './code/httpClientWrapper';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { UniversalInterceptor } from './code/httpInterceptor/universalInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './store/user.state';
import { AppErrorHandler } from './code/appErrorHandler';
import { GuardModule } from './gurad/gurad.module';
import { CommonModule } from '@angular/common';
import { WidgetModule } from './widgets/widget.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GuardModule,
    WidgetModule,
    NgxsModule.forRoot([UserState]),
  ],
  providers: [
    HttpClientWrapper,
    File,
    CookieService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
