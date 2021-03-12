import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import { Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// 导入弹窗组件
import { WorkIndexedDBService } from './core/modules/provider/indexedDB/work-indexedDB.service';
import { LoggerService } from './core/modules/provider/logger/logger.service';
import { UserService } from './core/services/user/user.service';
import { ApiUserIndexService } from './core/modules/provider/api';
import { SettingsService } from './core/services/settings/settings.service';

import vConsole from 'vconsole';
// import { TabsService } from './core/services/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private vconsole = vConsole;

  public isWebView: boolean;

  public settingConfig = {
    eyeCareMode: false
  };

  public mode = 'ios';

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private navController: NavController,
    private workIndexedDBService: WorkIndexedDBService,
    private logger: LoggerService,
    private settingsService: SettingsService,
    private userService: UserService,
    private apiUserIndexService: ApiUserIndexService
  ) {
    // const vconsole = new this.vconsole();
    this.initializeApp();
    // 初始化数据库
    this.workIndexedDBService.open()
      .subscribe(db => {
        this.logger.log(db);
        this.settingsService.getSettingsConfig().subscribe((info) => {
          console.log(info);
          if (info) {
            this.settingConfig = { ...this.settingConfig, ...info };
          }
        });
      }, err => {
        this.logger.log(err);
      });
    // 监听WxAppToken回调处理用户信息
    this.userService.getWxAppToken().subscribe((info: string) => {
      // console.log(info);
      if (info && info !== 'null' && info !== 'undefined') {
        // 注释服务协议
        // const serviceRule = localStorage.getItem('WxAppServiceRule');
        // if (!serviceRule) {
        //   // 服务协议
        //   this.serviceAgreementPresentModal();
        // }
        this.apiUserIndexService.asyncFetchBasicInfo().subscribe(res => res, err => err).unsubscribe();
      }
    });
    // 终端设备处理
    this.platform.ready().then(() => {
      // console.log(this.modalController);
      // console.log(this.platform);
      // console.log(this.navController);
      /**
       * | Platform Name   | Description                        |
       * |-----------------|------------------------------------|
       * | android         | on a device running Android.       |
       * | cordova         | on a device running Cordova.       |
       * | ios             | on a device running iOS.           |
       * | ipad            | on an iPad device.                 |
       * | iphone          | on an iPhone device.               |
       * | phablet         | on a phablet device.               |
       * | tablet          | on a tablet device.                |
       * | electron        | in Electron on a desktop device.   |
       * | pwa             | as a PWA app.                      |
       * | mobile          | on a mobile device.                |
       * | mobileweb       | on a mobile device in a browser.   |
       * | desktop         | on a desktop device.               |
       * | hybrid          | is a cordova or capacitor app.     |
       */
      // console.log(this.platform.is('pwa'));
      // console.log(this.platform.is('android'));
      // console.log(this.platform.is('capacitor'));
      // console.log(this.platform.is('cordova'));
      // PC
      // console.log(this.platform.is('desktop'));
      // console.log(this.platform.is('electron'));
      // console.log(this.platform.is('hybrid'));
      // 移动端Web
      // console.log(this.platform.is('mobileweb'));
      // console.log(this.platform.is('mobile'));
      // console.log(this.platform.is('iphone'));
      // console.log(this.platform.is('ios'));
      // console.log(this.platform.is('ipad'));
      // console.log(this.platform.is('phablet'));
      if (this.platform.is('mobileweb')) {
        this.setupBrowserBackButtonBehavior();
      }
      this.platform.backButton.subscribe((info) => {
        // console.log(info);
        // console.log(this.modalController);
        // console.log(this.platform);
        this.closeModelControllerEvent();
      });
    });
  }

  private setupBrowserBackButtonBehavior(): void {
    window.onpopstate = (event: Event) => {
      // 拦截返回处理
      console.log('<- Back Button Pressed');
      this.closeModelControllerEvent();
    };
  }
  // 处理弹窗类点击返回时关闭
  private closeModelControllerEvent(): void {
    const activePortal: any = this.modalController;
    // console.log(activePortal.getTop());
    if (activePortal) {
      activePortal.getTop().then((info: any) => {
        // console.log(info);
        if (info) {
          activePortal.dismiss();
        }
      });
      return;
    }
  }

  public onMainActivate(ev: Event | any): void {
    this.setWxAppTitle(ev.title);
    console.log(ev);
    console.log('当前为主路由：' + ev.checkedTabsName);
    this.isWebView = false;
  }
  public onMainDeactivate(ev: Event | any): void {
    console.log(ev);
    console.log('退出主路由：' + ev.checkedTabsName);
  }
  public onPopupActivate(ev: Event | any): void {
    console.log(ev);
    this.isWebView = true;
    console.log('当前为附属路由：' + ev.activatedRoute.outlet);
  }
  public onPopupDeactivate(ev: Event | any): void {
    console.log(ev);
    console.log('退出附属路由：' + ev.activatedRoute.outlet);
  }

  // 设置标题
  public setWxAppTitle(title: string) {
    document.title = title || '网赚-用户端';
  }

  async serviceAgreementPresentModal() {
    // const modal = await this.modalController.create({
    //   component: ServiceAgreementComponent,
    //   cssClass: 'service-agreement-component-modal-custom'
    // });
    // return await modal.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  globalTouchMoveEvent(ev: Event) {
    // ev.preventDefault();
    ev.stopPropagation();
  }
}
