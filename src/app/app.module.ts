import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// 注入网络请求
import { HttpService } from './core/modules/provider/http/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LarkHttpInterceptor } from './core/modules/provider/http/interceptor';
import { RequestPreviewHandler } from './core/modules/provider/http/handler/request-preview-handler';
import { RequestExceptionHandler } from './core/modules/provider/http/handler/request-exception-handler';
import { RequestProcessedHandler } from './core/modules/provider/http/handler/request-processed-handler';


// 缓存数据库加载 indexedDB
import { WorkIndexedDBService } from './core/modules/provider/indexedDB/work-indexedDB.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      mode: 'ios',
      hardwareBackButton: true,
      swipeBackEnabled: true
    }),
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RequestPreviewHandler},
    {provide: RequestProcessedHandler},
    {provide: RequestExceptionHandler},
    {provide: HTTP_INTERCEPTORS, useClass: LarkHttpInterceptor, multi: true},
    HttpService,
    WorkIndexedDBService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public statusBar: StatusBar) {
    this.statusBar.hide();
  }
}
