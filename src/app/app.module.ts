import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PhoneDeviceHttpClient, HttpClientBase, MobileHttpClient } from './code/httpClientBase';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { UniversalInterceptor } from './code/httpInterceptor/universalInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './store/user.state';
import { AppErrorHandler } from './code/appErrorHandler';
import { GuardModule } from './gurad/gurad.module';
import { CommonModule } from '@angular/common';
import { WidgetModule } from './widgets/widget.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarPipe } from './pipe/avatarPipe';
import { Platform } from '@ionic/angular'

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
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HttpClientBase, useFactory: (httpClient: HttpClient, http: HTTP, cookieService: CookieService, plt: Platform) => {
        if (plt.is("desktop") || plt.is("mobileweb")) {
          return new MobileHttpClient(httpClient);
        }
        else {
          return new PhoneDeviceHttpClient(http, cookieService);
        }
      },
      deps: [HttpClient, HTTP, CookieService, Platform]
    },
    File,
    HTTP,
    CookieService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    //{ provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
