import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpClientBase, AngularHttpClient, NativeHttpClient } from './code/httpClientBase';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { CookieService } from 'ngx-cookie-service';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from './store/user.state';
import { AppErrorHandler } from './code/appErrorHandler';
import { GuardModule } from './gurad/gurad.module';
import { CommonModule } from '@angular/common';
import { WidgetModule } from './widgets/widget.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular'
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicRouteStrategy } from './code/simpleReuseStrategy';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    NgxsModule.forRoot([UserState]),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GuardModule,
    WidgetModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HttpClientBase, useFactory: (httpClient: HttpClient, http: HTTP, cookieService: CookieService, plt: Platform, sotre: Store) => {
        if (plt.is("desktop") || plt.is("mobileweb")) {
          return new AngularHttpClient(httpClient, sotre);
        }
        else {
          return new NativeHttpClient(http, cookieService, sotre);
        }
      },
      deps: [HttpClient, HTTP, CookieService, Platform, Store]
    },
    File,
    HTTP,
    StatusBar,
    SplashScreen,
    CookieService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
